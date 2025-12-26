import { GetPlaceDetails } from "@/service/GlobalApi";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel?.hotelName + "," + hotel?.hotelAddress
      )}`}
      target="_blank"
    >
      <motion.div
        className="group relative bg-[#181825] rounded-xl overflow-hidden hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 ring-1 ring-white/5"
        whileHover={{ y: -3 }}
      >
        {/* Compact Image Section */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={photoUrl || "/demoTrip.webp"}
            alt={hotel?.hotelName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 backdrop-blur-md bg-black/50 border border-white/10 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
            <span className="text-yellow-400 text-[10px]">★</span>
            <span className="text-white text-xs font-medium">
              {hotel?.rating}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-3 flex flex-col gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base text-white line-clamp-1 group-hover:text-purple-400 transition-colors tracking-tight">
              {hotel?.hotelName}
            </h3>
            <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5 flex items-center gap-1">
              📍 {hotel?.hotelAddress}
            </p>
          </div>

          <div className="flex justify-between items-end pt-2 border-t border-white/5 mt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-medium tracking-wide">
                Price
              </span>
              <span className="font-semibold text-sm text-gray-200">
                {hotel?.price}
              </span>
            </div>
            <div className="bg-purple-600/10 p-1.5 rounded-full text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
