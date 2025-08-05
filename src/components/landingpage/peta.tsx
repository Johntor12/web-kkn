"use client";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="w-screen h-screen bg-[#013A18] relative overflow-hidden">
      <Image
        src="/landingpage/petakecamatan.svg"
        alt="Peta Kecamatan"
        fill
        className="object-cover" 
        priority
      />
    </div>
  );
};

export default Page;
