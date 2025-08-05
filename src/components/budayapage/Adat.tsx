"use client";
import { useState } from "react";

interface AdatItemProps {
  name: string;
  description: string;
  imageUrl: string;
}

const AdatCard = ({ name, description, imageUrl }: AdatItemProps) => {
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
      {/* Info */}
      <div className="flex flex-col gap-[0.416vw] p-[0.833vw] text-left">
        <h1 className="font-montserrat font-bold text-[2.5vw]">{name}</h1>
        <div className="font-montserrat text-[1.25vw]">{description}</div>
        <button
          className={`mt-2 border border-white px-4 py-2 text-sm font-semibold rounded-md w-fit hover:cursor-pointer ${
            isHovered
              ? "bg-white text-primary-100 hover:bg-gray-200"
              : "bg-primary-100 text-white hover:bg-primary-200"
          } transition`}
        >
          View More
        </button>
      </div>

      {/* Gambar */}
      <div className="flex justify-end items-center">
        <div className="w-[25vw] aspect-square bg-[#D9D9D9] border-black border-2 rounded-[1.563vw]">
          {/* Optional: tambahkan <img src={imageUrl} alt={name} /> */}
        </div>
      </div>
    </div>
  );
};

const dummyAdat: AdatItemProps[] = [
  {
    name: "Adat Mandi Balimau",
    description:
      "Tradisi penyucian diri yang dilakukan menjelang bulan Ramadan oleh masyarakat pesisir.",
    imageUrl: "/images/adat1.jpg",
  },
  {
    name: "Adat Naik Dango",
    description:
      "Upacara suku Dayak Kanayatn dalam menyambut panen dan berterima kasih kepada roh leluhur.",
    imageUrl: "/images/adat2.jpg",
  },
  {
    name: "Adat Pernikahan Tidung",
    description:
      "Prosesi adat pernikahan suku Tidung dengan simbolisasi penghormatan pada orang tua.",
    imageUrl: "/images/adat3.jpg",
  },
  {
    name: "Adat Tolak Bala",
    description:
      "Ritual untuk menolak musibah dengan sesajen dan doa adat oleh tokoh masyarakat.",
    imageUrl: "/images/adat4.jpg",
  },
  {
    name: "Adat Babukung",
    description:
      "Tradisi menghormati arwah leluhur dengan topeng dan tarian pada upacara kematian.",
    imageUrl: "/images/adat5.jpg",
  },
  {
    name: "Adat Menanam Padi",
    description:
      "Adat bersama dalam memulai musim tanam padi, sebagai wujud rasa syukur pada alam.",
    imageUrl: "/images/adat6.jpg",
  },
  {
    name: "Adat Belian",
    description:
      "Ritual penyembuhan penyakit secara spiritual oleh dukun atau balian.",
    imageUrl: "/images/adat7.jpg",
  },
  {
    name: "Adat Penyambutan Tamu",
    description:
      "Penyambutan tamu penting dengan sirih, tarian, dan simbol adat sebagai penghormatan.",
    imageUrl: "/images/adat8.jpg",
  },
];

const ITEMS_PER_PAGE = 4;

export default function AdatPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummyAdat.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAdat = dummyAdat.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="relative w-full flex flex-col justify-center items-center container py-10">
      <h1 className="font-hanken-grotesk text-primary-100 font-bold text-[3.906vw] px-[2.5vw] text-center mb-10">
        Adat Istiadat
      </h1>

      <div className="grid grid-rows-4 gap-y-[2.5vw] justify-items-center">
        {currentAdat.map((item, index) => (
          <AdatCard key={index} {...item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Sebelumnya
        </button>

        <span className="px-4 py-2 text-gray-700">
          {currentPage} dari {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
