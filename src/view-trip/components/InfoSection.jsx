import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Magazine Style Header Image */}
      <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group">
        <img
          src={photoUrl || "/demoTrip.webp"}
          alt={trip?.userSelection?.location?.label}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-black/20 to-transparent"></div>

        {/* Floating Glass Title Overlay */}
        <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-black text-4xl md:text-6xl text-white tracking-tighter leading-tight drop-shadow-xl"
            >
              {trip?.userSelection?.location?.label}
            </motion.h2>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-gray-200 text-xs font-medium">
                <span>📅</span> {trip?.userSelection?.noOfDays} Days
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-gray-200 text-xs font-medium">
                <span>💰</span> {trip?.userSelection?.budget} Budget
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-gray-200 text-xs font-medium">
                <span>👯‍♂️</span> {trip?.userSelection?.traveler} Travelers
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              trip?.userSelection?.location?.label
            )}`}
            target="_blank"
            className="hidden md:block"
          >
            <Button className="bg-white text-black hover:bg-gray-200 font-bold px-6 py-5 rounded-full text-base transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <FaSearchLocation className="mr-2 text-lg" /> View Map
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile only button */}
      <div className="md:hidden mt-6">
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            trip?.userSelection?.location?.label
          )}`}
          target="_blank"
        >
          <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6 rounded-xl text-lg shadow-lg">
            <FaSearchLocation className="mr-2" /> View Map
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
