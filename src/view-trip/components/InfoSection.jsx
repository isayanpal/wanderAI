import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FaSearchLocation } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export default function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const res = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[1].name
      );
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
        <img
          src={photoUrl || "/demoTrip.webp"}
          alt={trip?.userSelection?.location?.label}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="font-bold text-3xl text-white mb-2">
            {trip?.userSelection?.location?.label}
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-purple-500 bg-opacity-20 rounded-full text-purple-300 text-sm">
            📅 {trip?.userSelection?.noOfDays} Days
          </span>
          <span className="px-3 py-1 bg-green-500 bg-opacity-20 rounded-full text-green-300 text-sm">
            💵 {trip?.userSelection?.budget} Budget
          </span>
          <span className="px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full text-blue-300 text-sm">
            ⛺ {trip?.userSelection?.traveler} Travelers
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-300">
            Explore the beauty of {trip?.userSelection?.location?.label}
          </p>
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip?.userSelection?.location?.label)}`}
            target="_blank"
          >
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <FaSearchLocation className="mr-2" />
              View on Map
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

