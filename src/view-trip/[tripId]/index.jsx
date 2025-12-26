import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Hotels from "../components/Hotels";
import InfoSection from "../components/InfoSection";
import PlacesToVisit from "../components/PlacesToVisit";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    setLoading(true);
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document: ", docSnap.data());
      setTrip(docSnap.data());
    } else {
      // console.log("No such document");
      toast("No trip found");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#05050A]">
        <motion.div
          className="relative w-20 h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-0 border-4 border-purple-500/30 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-white p-6 md:p-10 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-900/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto space-y-16 relative z-10"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <PlacesToVisit trip={trip} />
      </motion.div>
    </div>
  );
}
