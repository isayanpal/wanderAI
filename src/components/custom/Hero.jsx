import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 justify-center gap-9">
      <h1 className="font-extrabold text-[40px] text-center text-[#ff9100]">
        Plan Your Dream Trip with AI Ease
      </h1>
      <p className="text-2xl text-white text-center">
        Discover personalized itineraries, top destinations, and seamless travel
        planning—all powered by intelligent AI
      </p>

      <Link to={"/create-trip"}>
        <Button>Get Started</Button>
      </Link>

      <img src="/heroImg.webp" alt=""  className="object-contain w-full h-[450px] rounded-xl"/>
    </div>
  );
}
