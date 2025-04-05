import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { GetPlaceDetails } from "@/service/GlobalApi"

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY

export default function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    if (place) {
      GetPlacePhoto()
    }
  }, [place])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    }
    try {
      const res = await GetPlaceDetails(data)
      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[1].name)
      setPhotoUrl(PhotoUrl)
    } catch (error) {
      console.error("Error fetching place photo:", error)
    }
  }

  return (
    <motion.div
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img src={photoUrl || "/demoTrip.webp"} alt={place?.placeName} className="h-48 w-full object-cover md:w-48" />
        </div>
        <div className="p-4 md:flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{place?.placeName}</h3>
          <p className="text-sm text-gray-600 mb-4">{place?.placeDetails}</p>
          <div className="flex items-center text-yellow-500">
            <span className="mr-2">🕛</span>
            <span>{place?.timeToTravel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

