import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export default function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {isLoading ? (
            <div className="w-full h-48 bg-gray-700 animate-pulse"></div>
          ) : (
            <img
              src={photoUrl || "/demoTrip.webp"}
              alt={trip?.userSelection?.location?.label}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="font-bold text-xl text-white">
              {trip?.userSelection?.location?.label}
            </h2>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              {trip?.userSelection?.noOfDays} Days
            </span>
            <span className="text-sm font-semibold text-purple-400">
              {trip?.userSelection?.budget}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            {trip?.userSelection?.traveler}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

