"use client";
import React from "react";

const transportasiData = [
  {
    nama: "Terminal Bus Kota A",
    alamat: "Jl. Raya Utama No. 45, Kota A",
    gambar: "/transportasi/terminal1.jpg",
  },
  {
    nama: "Stasiun Kereta Kota B",
    alamat: "Jl. Rel Kereta No. 10, Kota B",
    gambar: "/transportasi/stasiun1.jpg",
  },
  {
    nama: "Pelabuhan Laut Kota C",
    alamat: "Jl. Dermaga No. 88, Kota C",
    gambar: "/transportasi/pelabuhan1.jpg",
  },
];

const TransportasiPage = () => {
  const generateMapsLink = (alamat: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alamat)}`;

  return (
    <div className="font-montserrat mt-14 mb-16 px-12 w-full">
      <h1 className="text-[2.5vw] font-bold text-green-900 mb-[1.5vw] text-center">
        Transportasi
      </h1>

      {/* Tabel Data Transportasi */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-lg border border-gray-400 shadow-md rounded-lg border-collapse">
          <thead>
            <tr className="bg-gradient-to-b from-[#1B4526] via-[#1B4526] to-[#43AB5E] text-white font-medium text-left">
              <th className="px-6 h-16 border border-gray-400 w-[5%] text-center">No</th>
              <th className="px-6 h-16 border border-gray-400 w-[20%] text-center">Nama Tempat</th>
              <th className="px-6 h-16 border border-gray-400 w-[30%] text-center">Alamat</th>
              <th className="px-6 h-16 border border-gray-400 w-[15%] text-center">Lokasi</th>
              <th className="px-6 h-16 border border-gray-400 w-[30%] text-center">Gambar</th>
            </tr>
          </thead>
          <tbody>
            {transportasiData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-green-50 transition text-black`}
              >
                <td className="px-6 h-20 border border-gray-400 text-center font-medium">
                  {index + 1}
                </td>
                <td className="px-6 h-20 border border-gray-400 font-semibold">
                  {item.nama}
                </td>
                <td className="px-6 h-20 border border-gray-400">{item.alamat}</td>
                <td className="px-6 h-20 border border-gray-400 text-center">
                  <a
                    href={generateMapsLink(item.alamat)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 bg-white border border-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
                  >
                    Lihat Peta
                  </a>
                </td>
                <td className="px-6 h-20 border border-gray-400 text-center">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full max-w-[250px] h-36 object-cover rounded-md shadow mx-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransportasiPage;
