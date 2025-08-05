"use client";
import { useState } from "react";

export interface UMKMCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onViewMore?: () => void;
}

const UMKMCard = ({ name, description, imageUrl, onViewMore }: UMKMCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`grid grid-cols-2 w-[82.5vw] transition-all duration-300 p-[1.5vw] rounded-[1.563vw] border-[0.208vw] drop-shadow-[4px_8px_8px_rgba(0,0,0,0.25)] ${
        isHovered
          ? "bg-primary-100 text-white cursor-pointer"
          : "bg-white text-primary-100"
      } border-primary-100`}
    >
      <div className="flex flex-col gap-[0.416vw] p-[0.833vw] text-left">
        <h1 className="font-montserrat font-bold text-[2.5vw]">{name}</h1>
        <div className="font-montserrat text-[1.25vw]">{description}</div>
        <button
          onClick={onViewMore}
          className={`mt-2 border border-white px-4 py-2 text-sm font-semibold rounded-md w-fit hover:cursor-pointer ${
            isHovered
              ? "bg-white text-primary-100 hover:bg-gray-200"
              : "bg-primary-100 text-white hover:bg-primary-200"
          } transition`}
        >
          View More
        </button>
      </div>

      <div className="flex justify-end items-center">
        <div className="w-[25vw] aspect-square bg-[#D9D9D9] border-black border-2 rounded-[1.563vw]">
          {/* Optional: <img src={imageUrl} alt={name} className="w-full h-full object-cover" /> */}
        </div>
      </div>
    </div>
  );
};

export default UMKMCard;
