import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_Prompt,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function CreateTrip() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 3 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details!!");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_Prompt.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
    window.location.reload();
  };

  useEffect(() => {
    console.log("user logged in");
  }, [user]);

  return (
    <div className="min-h-screen text-white p-6 md:p-10">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Tell us your travel preferences
        </h2>
        <p className="text-gray-300 text-sm md:text-base mt-2">
          Just provide some basic information and our app will generate a
          customized planner based on your preferences
        </p>

        <div className="mt-10 space-y-12">
          <motion.div variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl mb-4 font-medium">
              What is the destination of your choice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
              selectProps={{
                place,
                onChange: (value) => {
                  setPlace(value);
                  handleInputChange("location", value);
                },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    color: 'white',
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: 'white',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#2563eb' : 'black',
                    color: 'white',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: 'white',
                  }),
                },
              }}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl mb-4 font-medium">
              How many days are you planning your trip?
            </h2>
            <Input
              placeholder="Eg. 7"
              type="number"
              className="bg-opacity-10 bg-white border-none text-white placeholder-gray-400"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl mb-4 font-medium">
              What is your Budget?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SelectBudgetOptions.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-6 border border-opacity-20 rounded-lg cursor-pointer transition-all duration-300 ${
                    formData?.budget === item.title
                      ? "bg-purple-500 bg-opacity-20 border-purple-500"
                      : "hover:bg-white hover:bg-opacity-5"
                  }`}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h2 className="font-bold text-lg mb-1">{item.title}</h2>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl mb-4 font-medium">
              Who do you plan on travelling with?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SelectTravelsList.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-6 border border-opacity-20 rounded-lg cursor-pointer transition-all duration-300 ${
                    formData?.traveler === item.people
                      ? "bg-pink-500 bg-opacity-20 border-pink-500"
                      : "hover:bg-white hover:bg-opacity-5"
                  }`}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h2 className="font-bold text-lg mb-1">{item.title}</h2>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 flex justify-end"
          variants={fadeInUp}
        >
          <Button
            disabled={loading}
            onClick={onGenerateTrip}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
            ) : (
              "Generate Trip ✨"
            )}
          </Button>
        </motion.div>
      </motion.div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">Sign In</DialogTitle>
            <DialogDescription>
            <h1 className="font-bold text-3xl mb-6 text-white">
                Wander
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                  AI
                </span>
              </h1>
              <p className="text-gray-400 mb-6">Access your account using Google Authentication</p>

              <Button
                disabled={loading}
                onClick={login}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-300"
              >
                <span>Sign In With Google</span>
                <FcGoogle className="h-6 w-6" />
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

