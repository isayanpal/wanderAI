import { motion } from "motion/react"
import PlaceCardItem from "./PlaceCardItem"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function PlacesToVisit({ trip }) {
  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={fadeInUp}>
      <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Places to Visit
      </h2>
      <div className="space-y-8">
        {trip?.tripData?.itinerary &&
          Object.keys(trip.tripData.itinerary)
            .sort()
            .map((dayKey, index) => {
              const dayData = trip.tripData.itinerary[dayKey]

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-2xl uppercase tracking-widest font-semibold mb-4 text-purple-400">{dayKey}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(dayData.places) &&
                      dayData.places.map((place, placeIndex) => <PlaceCardItem key={placeIndex} place={place} />)}
                  </div>
                </motion.div>
              )
            })}
      </div>
    </motion.div>
  )
}

