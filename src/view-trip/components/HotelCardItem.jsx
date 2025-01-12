import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export default function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };
    try {
      const res = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[1].name
      );
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + "," + hotel?.hotelAddress)}`}
      target="_blank"
    >
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative h-48">
          <img
            src={photoUrl || "/demoTrip.webp"}
            alt={hotel?.hotelName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded-full text-sm">
            ⭐ {hotel?.rating}
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg truncate">{hotel?.hotelName}</h3>
          <p className="text-sm text-gray-400 truncate">📍 {hotel?.hotelAddress}</p>
          <p className="text-purple-400 font-semibold">💵 {hotel?.price}</p>
        </div>
      </motion.div>
    </Link>
  );
}

