import React from "react";

const StrukturOrganisasi = () => {
  const data = [
    {
      jabatan: "Camat",
      nama: "Lorem ipsum. S.Kom",
    },
    {
      jabatan: "Sekre Camat",
      nama: "Lorem ipsum. S.Kom",
    },
  ];

  return (
    <div className="font-montserrat flex flex-col items-center mt-20 mb-10">
      <h2 className="text-[2.5vw] font-bold text-green-900 mb-[1.5vw]">
        Daftar Pejabat
      </h2>

      <div className="flex flex-col md:flex-row gap-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="border-3 border-blue-400 rounded-lg overflow-hidden w-[350px] bg-white shadow-lg"
          >
            <div className="w-full h-[350px] bg-gray-100">
              <img
                src="/strukturorganisasi/camat.svg"
                alt={item.jabatan}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-6 mt-3 mb-5">
              <p className="text-gray-500 text-base font-medium">
                {item.jabatan}
              </p>
              <p className="text-gray-700 font-semibold text-lg">
                {item.nama}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-[5vw] mb-10">
        <h2 className="text-[2.5vw] font-bold text-green-900 mb-[1.5vw]">
          Struktur Organisasi
        </h2>
        {/* Gambar Bagan */}
        <div className="w-full flex justify-center">
          <img
            src="/strukturorganisasi/bagan.svg"
            alt="Bagan Struktur Organisasi"
            className="w-full max-w-[1400px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
