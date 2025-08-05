"use client";
import React from "react";

interface BeritaCardProps {
  judul: string;
  content: string;
  // image?: string;
}

const BeritaCard = ({
  judul = "Judul Berita",
  content = "Deskripsi singkat berita akan muncul di sini sebagai preview isi berita.",
}: BeritaCardProps) => {
  return (
    <button className="group relative flex flex-col items-center bg-primary-100 w-[15.625vw] hover:scale-[1.03] transition-transform duration-300 aspect-[300/550] cursor-pointer rounded-[1.563vw] border border-primary-100 shadow-lg overflow-hidden">
      {/* Gambar atas (placeholder) */}
      <div className="flex bg-primary-100 w-full h-[50%] rounded-t-[1.563vw] relative">
        {/* Tambahkan gambar di sini jika diperlukan */}
        {/* <Image src={image} ... /> */}
      </div>

      {/* Konten bawah */}
      <div className="flex flex-col bg-white w-full h-[50%] rounded-b-[1.563vw] p-[1vw] justify-between text-left">
        <h3 className="font-montserrat font-bold text-[1.2vw] text-gray-800 leading-tight line-clamp-2">
          {judul}
        </h3>
        <p className="font-montserrat text-[0.95vw] text-gray-600 mt-2 leading-snug line-clamp-3">
          {content}
        </p>
      </div>

      {/* Efek hover glow */}
      <div className="absolute inset-0 rounded-[1.563vw] ring-0 group-hover:ring-[6px] ring-green-300/50 transition-all duration-300" />
    </button>
  );
};

export default BeritaCard;
