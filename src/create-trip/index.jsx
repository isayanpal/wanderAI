import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/custom/LoginDialog";
import {
  AI_Prompt,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { chatSession } from "@/service/AIModal";
import { db } from "@/service/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AiOutlineLoading3Quarters,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaUserFriends,
  FaWallet,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const blobVariants = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 90, 0],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({ noOfDays: 3 });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loading: authLoading, login } = useGoogleAuth({
    onSuccess: () => {
      setOpenDialog(false);
      onGenerateTrip();
    },
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDaysChange = (increment) => {
    const currentDays = formData.noOfDays || 1;
    const newDays = increment ? currentDays + 1 : currentDays - 1;
    if (newDays >= 1 && newDays <= 30) {
      handleInputChange("noOfDays", newDays);
    }
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler) {
      toast.error("Please fill all details correctly!");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_Prompt
      .replace("{location}", formData?.location.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      await SaveAiTrip(result?.response?.text());
    } catch (e) {
      setLoading(false);
      toast.error("Failed to generate plan. Please try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      navigate("/view-trip/" + docId);
    } catch (e) {
      console.error("Error saving trip", e);
      toast.error("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "1rem",
      padding: "0.75rem",
      color: "white",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(168, 85, 247, 0.4)" : "none",
      cursor: "text",
      transition: "all 0.3s ease",
      "&:hover": {
        border: "1px solid rgba(168, 85, 247, 0.5)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
      fontSize: "1.1rem",
      fontWeight: "500",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.3)",
      fontWeight: "300",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
      fontWeight: "500",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0f0f11",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "1rem",
      marginTop: "0.8rem",
      padding: "0.5rem",
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(168, 85, 247, 0.15)"
        : "transparent",
      color: state.isFocused ? "#f3e8ff" : "rgba(255,255,255,0.8)",
      padding: "10px 15px",
      borderRadius: "0.5rem",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
  };

  return (
    <div className="min-h-screen text-white py-12 px-4 md:px-10 relative overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Animated Background Gradients */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"
        style={{ animationDelay: "-5s" }}
      />
      <div className="absolute top-[30%] left-[50%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none transform -translate-x-1/2" />

      <motion.div
        className="max-w-4xl mx-auto space-y-20 pb-20"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={fadeInUp} className="text-center space-y-6">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-2xl">
              Plan Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 animate-gradient-x">
                Dream Trip
              </span>
            </h2>
            <motion.div
              className="absolute -right-8 -top-8 text-5xl"
              animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              ✈️
            </motion.div>
          </div>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Tell us your preferences, and our advanced AI will craft the perfect
            itinerary for your next adventure.
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Destination & Days Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <FaMapMarkerAlt size={20} />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Destination
                </h2>
              </div>
              <div className="relative group">
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                  selectProps={{
                    place,
                    onChange: (value) => {
                      setPlace(value);
                      handleInputChange("location", value);
                    },
                    styles: customStyles,
                    placeholder: "Where to?",
                  }}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <FaCalendarAlt size={20} />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Duration
                </h2>
              </div>

              {/* Custom Day Counter */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-1.5 md:p-2 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                <button
                  onClick={() => handleDaysChange(false)}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 disabled:opacity-50"
                  disabled={formData.noOfDays <= 1}
                >
                  <AiOutlineMinus size={18} />
                </button>

                <div className="flex flex-col items-center">
                  <span className="text-xl md:text-2xl font-bold text-white tabular-nums tracking-tight">
                    {formData.noOfDays}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                    Days
                  </span>
                </div>

                <button
                  onClick={() => handleDaysChange(true)}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 disabled:opacity-50"
                  disabled={formData.noOfDays >= 30}
                >
                  <AiOutlinePlus size={18} />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Budget Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="flex items-center gap-3 text-center md:text-left justify-center md:justify-start">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                <FaWallet size={20} />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Your Budget
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SelectBudgetOptions.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`relative p-8 rounded-3xl cursor-pointer border transition-all duration-500 group overflow-hidden flex flex-col items-center text-center gap-4 ${
                    formData?.budget === item.title
                      ? "bg-gradient-to-br from-purple-900/40 to-black border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                      : "bg-white/5 border-white/5 hover:border-purple-500/30 hover:bg-white/10"
                  }`}
                >
                  <AnimatePresence>
                    {formData?.budget === item.title && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-4 right-4 text-purple-400"
                      >
                        <FaCheckCircle size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-5xl bg-gradient-to-br from-white/10 to-transparent p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-gray-100 mb-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Travelers Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="flex items-center gap-3 text-center md:text-left justify-center md:justify-start">
              <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                <FaUserFriends size={20} />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Traveling Crew
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SelectTravelsList.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`relative p-8 rounded-3xl cursor-pointer border transition-all duration-500 group overflow-hidden flex flex-col items-center text-center gap-4 ${
                    formData?.traveler === item.people
                      ? "bg-gradient-to-br from-pink-900/40 to-black border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.15)]"
                      : "bg-white/5 border-white/5 hover:border-pink-500/30 hover:bg-white/10"
                  }`}
                >
                  <AnimatePresence>
                    {formData?.traveler === item.people && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-4 right-4 text-pink-400"
                      >
                        <FaCheckCircle size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-5xl bg-gradient-to-br from-white/10 to-transparent p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-gray-100 mb-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div
          className="pt-8 flex justify-center md:justify-end"
          variants={fadeInUp}
        >
          <Button
            disabled={loading || authLoading}
            onClick={onGenerateTrip}
            className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              {loading || authLoading ? (
                <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Generate Trip <span className="text-xl">✨</span>
                </>
              )}
            </span>
          </Button>
        </motion.div>
      </motion.div>

      <LoginDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onLogin={login}
        loading={authLoading}
      />
    </div>
  );
}
