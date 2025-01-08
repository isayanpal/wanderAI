export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "🙎",
    people: "1",
  },
  {
    id: 2,
    title: "A couple",
    desc: "Two travels in tandem",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving people",
    icon: "🏠",
    people: "3 to 5 people",
  },
];


export const SelectBudgetOptions = [
    {
      id: 1,
      title: "Cheap",
      desc: "Stay conscious of costs",
      icon: "💸",
    },
    {
      id: 2,
      title: "Moderate",
      desc: "Balance comfort and cost",
      icon: "💰",
    },
    {
      id: 3,
      title: "Luxury",
      desc: "Indulge in premium experiences",
      icon: "💎",
    },
  ];
  

export const AI_Prompt = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'