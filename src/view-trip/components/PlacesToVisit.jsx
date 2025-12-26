import { motion } from "motion/react";
import PlaceCardItem from "./PlaceCardItem";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function PlacesToVisit({ trip }) {
  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <h2 className="font-bold text-3xl text-white mb-8 tracking-tighter">
        Places to Visit
      </h2>
      <div className="space-y-8">
        {trip?.tripData?.itinerary &&
          Object.keys(trip.tripData.itinerary)
            .sort()
            .map((dayKey, index) => {
              const dayData = trip.tripData.itinerary[dayKey];

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 "
                >
                  <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-purple-500 pl-4">
                    {dayKey.toUpperCase()}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {Array.isArray(dayData.places) &&
                      dayData.places.map((place, placeIndex) => (
                        <PlaceCardItem key={placeIndex} place={place} />
                      ))}
                  </div>
                </motion.div>
              );
            })}
      </div>
    </motion.div>
  );
}
