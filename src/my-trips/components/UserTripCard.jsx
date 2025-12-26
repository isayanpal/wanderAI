import { GetPlaceDetails } from "@/service/GlobalApi";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <Link to={"/view-trip/" + trip?.id} className="block w-full h-full">
      <motion.div
        className="group relative h-[260px] w-full overflow-hidden rounded-3xl bg-gray-900 border border-white/10 shadow-xl"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {isLoading ? (
            <div className="w-full h-full bg-gray-800/50 animate-pulse" />
          ) : (
            <img
              src={photoUrl || "/demoTrip.webp"}
              alt={trip?.userSelection?.location?.label}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          )}
          {/* Main Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-transparent opacity-50" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          {/* Top Badges */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10 shadow-sm transition-colors group-hover:bg-black/30">
                {trip?.userSelection?.noOfDays} Days
              </span>
            </div>

            <span className="inline-flex items-center justify-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-200 backdrop-blur-md border border-purple-500/20 shadow-sm transition-colors group-hover:bg-purple-500/20 group-hover:border-purple-500/30">
              {trip?.userSelection?.budget}
            </span>
          </div>

          {/* Bottom Info */}
          <div className="translate-y-2 transform transition-transform duration-500 ease-out group-hover:translate-y-0">
            <h2 className="line-clamp-2 text-2xl font-bold text-white leading-tight drop-shadow-xl mb-3 tracking-tight">
              {trip?.userSelection?.location?.label}
            </h2>

            <div className="flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <div className="rounded-full bg-white/10 p-1.5 backdrop-blur-md border border-white/5">
                  <svg
                    className="w-3.5 h-3.5"
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
                </div>
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                  {trip?.userSelection?.traveler}
                </span>
              </div>

              {/* Arrow Icon Reveal */}
              <div className="w-8 h-8 rounded-full bg-white text-gray-950 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 shadow-lg shadow-purple-500/20 scale-90 group-hover:scale-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
