import React from "react";
import HotelCardItem from "./HotelCardItem";


export default function Hotels({ trip }) {
  return (
    <div className="text-white">
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <HotelCardItem hotel={hotel} key={index}/>
        ))}
      </div>
    </div>
  );
}
