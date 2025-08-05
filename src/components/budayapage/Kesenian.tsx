"use client";
import { useState } from "react";

interface KesenianItemProps {
  name: string;
  description: string;
  imageUrl: string;
}

const KesenianCard = ({ name, description, imageUrl }: KesenianItemProps) => {
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
      {/* Info Text */}
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

      {/* Image Placeholder */}
      <div className="flex justify-end items-center">
        <div className="w-[25vw] aspect-square bg-[#D9D9D9] border-black border-2 rounded-[1.563vw]">
          {/* Optional: <img src={imageUrl} alt={name} className="w-full h-full object-cover" /> */}
        </div>
      </div>
    </div>
  );
};

const dummyKesenian: KesenianItemProps[] = [
  {
    name: "Tari Jepen",
    description:
      "Tarian khas Kalimantan yang menggambarkan keharmonisan dan keindahan gerakan tubuh.",
    imageUrl: "/images/kesenian1.jpg",
  },
  {
    name: "Tari Piring",
    description:
      "Tarian tradisional yang menampilkan atraksi piring dengan gerakan cepat dan dinamis.",
    imageUrl: "/images/kesenian2.jpg",
  },
  {
    name: "Musik Gamelan",
    description:
      "Ansambel musik tradisional yang menggunakan alat musik pukul seperti gong dan saron.",
    imageUrl: "/images/kesenian3.jpg",
  },
  {
    name: "Tari Saman",
    description:
      "Tari dari Aceh yang dipentaskan dengan gerakan duduk serempak penuh energi dan semangat.",
    imageUrl: "/images/kesenian4.jpg",
  },
  {
    name: "Pertunjukan Wayang",
    description:
      "Seni teater boneka tradisional yang menceritakan kisah legenda atau sejarah lokal.",
    imageUrl: "/images/kesenian5.jpg",
  },
  {
    name: "Tari Mandau",
    description:
      "Tarian perang khas Dayak yang menggunakan properti mandau dan perisai.",
    imageUrl: "/images/kesenian6.jpg",
  },
  {
    name: "Seni Ukir Dayak",
    description:
      "Ukiran tradisional khas suku Dayak yang penuh simbol dan makna spiritual.",
    imageUrl: "/images/kesenian7.jpg",
  },
  {
    name: "Seni Musik Kulintangan",
    description:
      "Alat musik tradisional Sabah-Kalimantan yang terdiri dari gong-gong kecil berderet.",
    imageUrl: "/images/kesenian8.jpg",
  },
];

const ITEMS_PER_PAGE = 4;

export default function KesenianPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummyKesenian.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = dummyKesenian.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="relative w-full flex flex-col justify-center items-center container py-10">
      <h1 className="font-hanken-grotesk text-primary-100 font-bold text-[3.906vw] px-[2.5vw] text-center mb-10">
        Kesenian Daerah
      </h1>

      <div className="grid grid-rows-4 gap-y-[2.5vw] justify-items-center">
        {currentItems.map((item, index) => (
          <KesenianCard key={index} {...item} />
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
