"use client";
import React, { useState } from "react";
import Image from "next/image";

const regulations = [
  "Warga diimbau menjaga kelestarian lingkungan pesisir dan hutan mangrove.",
  "Kegiatan nelayan wajib mengikuti jadwal dan ketentuan desa.",
  "Dilarang menangkap satwa laut yang dilindungi.",
  "Setiap kegiatan adat harus mendapatkan persetujuan tokoh adat dan kepala desa.",
  "Kegiatan hiburan desa harus berakhir maksimal pukul 22.00 WIB.",
];

export default function DesaSetabuPage() {
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpanded((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="font-montserrat w-full px-4 md:px-20 py-14 text-[#1B4526] bg-none min-h-screen text-xl mt-16">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Map Section */}
        <div className="relative w-full lg:w-1/2 h-[500px] rounded-lg overflow-hidden">
          <Image
            src="/landingpage/setabu.svg"
            alt="Peta Desa Setabu"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Description Section */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-6xl font-bold text-green-900 mb-4">Desa Setabu</h1>
          <p className="text-gray-700 text-xl leading-relaxed">
            Desa Setabu merupakan desa pesisir dengan kekayaan laut yang melimpah dan budaya masyarakat yang kuat. Warga hidup berdampingan secara harmonis dengan alam serta memegang teguh nilai-nilai tradisional.
          </p>

          {/* Statistics */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <div className="flex-1 border rounded-xl p-5 bg-white shadow-sm text-center">
              <p className="text-base text-gray-500">Jumlah Penduduk</p>
              <p className="text-green-800 text-5xl font-extrabold">
                6<span className="text-lg font-medium"> ribu</span>
              </p>
            </div>
            <div className="flex-1 border rounded-xl p-5 bg-white shadow-sm text-center">
              <p className="text-base text-gray-500">Luas Wilayah</p>
              <p className="text-green-800 text-5xl font-extrabold">
                18<span className="text-lg font-medium"> km²</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Peraturan Desa */}
      <div className="mt-32">
        <h2 className="text-5xl font-bold text-green-900 mb-10 text-center">
          Peraturan Desa
        </h2>
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {regulations.map((text, index) => (
            <div
              key={index}
              onClick={() => toggleExpand(index)}
              className="bg-green-800 hover:bg-[#1B4526] transition-all duration-300 text-white px-8 py-6 rounded-xl shadow-md cursor-pointer flex justify-between items-center"
            >
              <span className="text-2xl font-semibold">{text}</span>
              <span className="text-5xl font-bold leading-none">
                {expanded.includes(index) ? "−" : "+"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
