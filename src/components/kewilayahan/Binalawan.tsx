/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePeraturan } from "@/hooks/use-rule";
import { NamaDesa, PeraturanById } from "@/type/data";
import Link from "next/link";


export default function DesaBinalawanPage() {
  const { getRuleByDesa } = usePeraturan();
  const [data, setData] = useState<PeraturanById[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      await getRuleByDesa.getRuleByDesa(NamaDesa.binalawan);
    }
    fetchData();
  }, [])

  React.useEffect(() => {
    if (Array.isArray(getRuleByDesa.payload?.data)) {
      setData(getRuleByDesa.payload.data);
      console.log(getRuleByDesa.payload?.data);
    }
  }, [getRuleByDesa.payload])

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
            src="/landingpage/Binalawan.svg"
            alt="Peta Desa Binalawan"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Description Section */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-6xl font-bold text-green-900 mb-4">Desa Binalawan</h1>
          <p className="text-gray-700 text-xl leading-relaxed">
            Desa Binalawan adalah desa yang terletak di kawasan tropis dengan komunitas yang aktif dan berbudaya. Dikenal karena keindahan alamnya serta kehidupan masyarakat yang harmonis.
          </p>

          {/* Statistics */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <div className="flex-1 border rounded-xl p-5 bg-white shadow-sm text-center">
              <p className="text-base text-gray-500">Jumlah Penduduk</p>
              <p className="text-green-800 text-5xl font-extrabold">
                12<span className="text-lg font-medium"> ribu</span>
              </p>
            </div>
            <div className="flex-1 border rounded-xl p-5 bg-white shadow-sm text-center">
              <p className="text-base text-gray-500">Luas Wilayah</p>
              <p className="text-green-800 text-5xl font-extrabold">
                25<span className="text-lg font-medium"> km²</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Page: Peraturan Desa */}
      <div className="mt-32">
        <h2 className="text-5xl font-bold text-green-900 mb-10 text-center">
          Peraturan Desa
        </h2>
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {data.map((ruleData, index) => (
            <div
              key={index}
              onClick={() => toggleExpand(index)}
              className="bg-green-800 hover:bg-[#1B4526] transition-all duration-300 text-white px-8 py-6 rounded-xl shadow-md cursor-pointer flex justify-between items-center"
            >
              <Link target="_blank" href={ruleData.fileUrl}>
                <span className="text-2xl font-semibold">{ruleData.judul}</span>
              </Link>
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
