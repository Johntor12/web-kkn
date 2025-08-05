"use client";
import { useState } from "react";

interface SDAItemProps {
  name: string;
  description: string;
  imageUrl: string;
}

const SDACard = ({ name, description, imageUrl }: SDAItemProps) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className={`grid grid-cols-2 w-[82.5vw] transition-all duration-300 p-[1.5vw] rounded-[1.563vw] border-[0.208vw] drop-shadow-[4px_8px_8px_rgba(0,0,0,0.25)] ${
        isCardHovered
          ? "bg-primary-100 text-white cursor-pointer"
          : "bg-white text-primary-100"
      } border-primary-100`}
    >
      {/* Info Text */}
      <div className="flex flex-col gap-[0.416vw] p-[0.833vw] text-left ">
        <h1 className="font-montserrat font-bold text-[2.5vw]">{name}</h1>
        <div className="font-montserrat text-[1.25vw]">{description}</div>
        <button
          className={`mt-2 border border-white px-4 py-2 text-sm font-semibold rounded-md w-fit hover:cursor-pointer ${
            isCardHovered
              ? "bg-white text-primary-100 hover:bg-gray-200"
              : "bg-primary-100 text-white hover:bg-primary-200"
          } transition`}
        >
          View More
        </button>
      </div>

      {/* Gambar Placeholder */}
      <div className="flex justify-end items-center">
        <div className="w-[25vw] aspect-square bg-[#D9D9D9] border-black border-2 rounded-[1.563vw]">
          {/* Bisa tambahkan <img src={imageUrl} /> di sini */}
        </div>
      </div>
    </div>
  );
};

const dummySDA: SDAItemProps[] = [
  {
    name: "Perikanan Laut",
    description: "Potensi besar hasil laut seperti ikan, udang, dan rumput laut.",
    imageUrl: "/images/sda1.jpg",
  },
  {
    name: "Hutan Mangrove",
    description: "Ekosistem penting untuk perlindungan pesisir dan habitat biota.",
    imageUrl: "/images/sda2.jpg",
  },
  {
    name: "Kelapa Sawit",
    description: "Sumber ekonomi dari hasil perkebunan masyarakat.",
    imageUrl: "/images/sda3.jpg",
  },
  {
    name: "Tambak Garam",
    description: "Produksi garam rakyat di wilayah pesisir.",
    imageUrl: "/images/sda4.jpg",
  },
  {
    name: "Sumber Air Bersih",
    description: "Mata air alami yang menjadi sumber kehidupan warga.",
    imageUrl: "/images/sda5.jpg",
  },
  {
    name: "Perkebunan Cokelat",
    description: "Kakao unggulan yang dikembangkan secara berkelanjutan.",
    imageUrl: "/images/sda6.jpg",
  },
  {
    name: "Tanah Subur",
    description: "Lahan pertanian produktif untuk padi dan sayuran.",
    imageUrl: "/images/sda7.jpg",
  },
  {
    name: "Ekowisata Alam",
    description: "Destinasi wisata alam yang mendukung konservasi.",
    imageUrl: "/images/sda8.jpg",
  },
];

const ITEMS_PER_PAGE = 4;

export default function SDAPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummySDA.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSDA = dummySDA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="relative w-full flex flex-col justify-center items-center container py-10">
      <h1 className="font-hanken-grotesk text-primary-100 font-bold text-[3.906vw] px-[2.5vw] text-center mb-10">
        Sumber Daya Alam
      </h1>

      <div className="grid grid-rows-4 gap-y-[2.5vw] justify-items-center">
        {currentSDA.map((sda, index) => (
          <SDACard key={index} {...sda} />
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
