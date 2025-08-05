"use client";

import { FaArrowRight } from "react-icons/fa6";

const VisiMisi = () => {
  return (
    <div className="font-montserrat flex flex-wrap justify-between gap-[2vw] px-[5vw] w-full mt-[3vw]">
      {/* Kiri: Konten Visi & Misi */}
      <div className="flex-1 max-w-[45vw]">
        <h2 className="text-[2.5vw] font-bold text-green-900 mb-[1.5vw]">
          Visi dan Misi
        </h2>

        <p className="text-[1vw] text-black mb-[1.2vw] leading-[1.7vw]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam,
        </p>

        <button className="relative overflow-hidden group font-semibold px-[1.2vw] h-[2.7vw] rounded-md mb-[1.5vw] shadow-md text-[1vw] text-white">
          <span className="absolute inset-0 bg-green-900 z-0" />
          <span className="absolute inset-0 bg-green-600 z-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10 flex items-center gap-[0.8vw]">
            <FaArrowRight />
            Visi Sebatik Barat
          </span>
        </button>

        <p className="text-[1vw] text-black mb-[1.2vw] leading-[1.7vw]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam,
        </p>

        <button className="relative overflow-hidden group font-semibold px-[1.2vw] h-[2.7vw] rounded-md mb-[1vw] shadow-md text-[1vw] text-white">
          <span className="absolute inset-0 bg-green-600 z-0" />
          <span className="absolute inset-0 bg-green-900 z-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10 flex items-center gap-[0.8vw]">
            <FaArrowRight />
            Misi Sebatik Barat
          </span>
        </button>

        <ol className="list-decimal list-inside text-black text-[1vw] space-y-[0.5vw] mt-[0.8vw]">
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</li>
          <li>
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </li>
          <li>Ut enim ad minim veniam,</li>
        </ol>
      </div>

      {/* Kanan: Kotak Gambar atau Placeholder */}
      <div className="grid grid-cols-2 gap-[1vw]">
        <div className="col-span-1 row-span-2 w-[20vw] h-[30vw] bg-gray-300 rounded-xl border border-blue-300" />
        <div className="w-[20vw] h-[14.5vw] bg-gray-400 rounded-xl border border-blue-300" />
        <div className="w-[20vw] h-[14.5vw] bg-gray-400 rounded-xl border border-blue-300" />
      </div>
    </div>
  );
};

export default VisiMisi;
