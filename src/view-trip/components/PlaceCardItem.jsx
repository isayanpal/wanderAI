import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export default function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    const result = await GetPlaceDetails(data).then((res) => {
      // console.log(res.data.places[0].photos[1].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[1].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer">
      <img
        src={photoUrl ? photoUrl : "/demoTrip.webp"}
        alt={place?.placeName}
        className="w-[130px] h-[130px] object-cover rounded-xl mt-2"
      />
      <div>
        <h2 className="text-lg font-bold">{place?.placeName}</h2>
        <p className="text-sm text-gray-400">{place?.placeDetails}</p>
        <p className="text-md text-[#ff9100] font-medium mt-2">
          🕛 {place?.timeToTravel}
        </p>
      </div>
    </div>
  );
}
