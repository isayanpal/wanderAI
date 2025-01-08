import React from "react";
import PlaceCardItem from "./PlaceCardItem";

export default function PlacesToVisit({ trip }) {
  return (
    <div className="text-white mt-5">
      <h2 className="font-bold text-lg">Places to visit</h2>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        {trip?.tripData?.itinerary &&
          Object.keys(trip.tripData.itinerary).sort().map((dayKey, index) => {
            const dayData = trip.tripData.itinerary[dayKey];

            return (
              <div key={index} className="mb-4 ">
                {/* Day Heading */}
                <h2 className="text-xl font-semibold uppercase tracking-widest">
                  {dayKey}
                </h2>

                {/* Places */}
                <div className="mt-2">
                  <h3 className="text-lg font-medium">Places:</h3>
                  {Array.isArray(dayData.places) &&
                    dayData.places.map((place, placeIndex) => (
                      <div key={placeIndex} className="mt-2 p-3">
                        <PlaceCardItem place={place} />
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
