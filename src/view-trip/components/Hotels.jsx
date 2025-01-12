import React from "react";
import { motion } from "motion/react";
import HotelCardItem from "./HotelCardItem";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Hotels({ trip }) {
  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Hotel Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <HotelCardItem hotel={hotel} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

