import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function MyTrips() {
  const navigate = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white p-6 md:p-10">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <h2 className="font-bold text-4xl md:text-5xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Trips
        </h2>

        {loading ? (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </motion.div>
        ) : userTrips.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={fadeInUp}
          >
            {userTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <UserTripCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            variants={fadeInUp}
          >
            <p className="text-xl text-gray-400">You haven't created any trips yet.</p>
            <button
              onClick={() => navigate("/create-trip")}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Create Your First Trip
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

