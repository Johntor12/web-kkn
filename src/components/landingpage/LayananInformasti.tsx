"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Submenu = { label: string; path: string };

type LayananKategori = {
  title: string;
  iconSrc: string;
  submenu: Submenu[];
};

const layananList: LayananKategori[] = [
  {
    title: "Profil",
    iconSrc: "https://img.icons8.com/ios-filled/100/0b4227/source-code.png",
    submenu: [
      { label: "Visi dan Misi", path: "/visimisi" },
      { label: "Struktur Organisasi", path: "/strukturorganisasi" },
    ],
  },
  {
    title: "Prasarana",
    iconSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/57d412d4f5a491d5a60eaa6117fc9fec67e4477a",
    submenu: [
      { label: "Pendidikan", path: "/pendidikan" },
      { label: "Olahraga", path: "/olahraga" },
      { label: "Kesehatan", path: "/kesehatan" },
      { label: "Transportasi", path: "/transportasi" },
      { label: "Tempat Ibadah", path: "/tempatibadah" },
    ],
  },
  {
    title: "Kewilayahan",
    iconSrc: "https://img.icons8.com/ios-filled/100/0b4227/map.png",
    submenu: [
      { label: "Desa Binalawan", path: "/binalawan" },
      { label: "Desa Liang Bunyu", path: "/liangbunyu" },
      { label: "Desa Bambangan", path: "/bambangan" },
      { label: "Desa Setabu", path: "/setabu" },
    ],
  },
  {
    title: "UMKM",
    iconSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/f2a98b30b5b1bac95f35afb1ba23dd3fa1177b95",
    submenu: [{ label: "UMKM", path: "/umkm" }],
  },
  {
    title: "SDA",
    iconSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/8ec2b2e84138b025d82ff2e28178db8109289d83",
    submenu: [{ label: "Sumber Daya Alam", path: "/sumberdayaalam" }],
  },
  {
    title: "Budaya",
    iconSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/ef6082d9e5dab750719f31054bb10b6c82570240",
    submenu: [
      { label: "Adat Istiadat", path: "/adatistiadat" },
      { label: "Kesenian", path: "/kesenian" },
      { label: "Suku", path: "/suku" },
    ],
  },
];

const LayananInformasiCard = ({
  title,
  iconSrc,
  submenu,
  isOpen,
  onToggle,
}: LayananKategori & { isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="relative w-[18.229vw]">
      <div
        className="group relative flex flex-col justify-center items-center w-full aspect-square bg-[#D9D9D9] border-[0.104vw] border-primary-100 rounded-[1.563vw] p-[1.25vw] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden"
        onClick={onToggle}
      >
        <div className="flex flex-col gap-[0.625vw] items-center z-10">
          <div className="relative bg-white w-[13.021vw] aspect-[250/206] rounded-[1.563vw] flex items-center justify-center">
            <img
              src={iconSrc}
              alt={title}
              className="w-[6vw] h-[6vw] object-contain"
            />
          </div>
        </div>

        {/* Overlay muncul saat hover */}
        <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full bg-white bg-opacity-90 flex justify-center items-end p-4 rounded-[1.563vw] transition-all duration-300 ease-in-out">
          <p className="font-montserrat font-semibold text-[1.5vw] text-primary-100 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            {title}
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[100%] mt-2 left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-20">
          <ul className="flex flex-col p-2">
            {submenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="block px-3 py-2 hover:bg-gray-100 text-sm text-primary-100 font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LayananInformasi = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-[90%] mx-auto flex flex-col items-center relative">
      <h1 className="font-hankenGrotesk font-bold text-[3.906vw] text-primary-100 text-center">
        LAYANAN INFORMASI
      </h1>
      <div className="w-full flex flex-row items-center gap-[0.416vw] my-[1vw]">
        <hr className="w-[48%] border-primary-100 border-[0.26vw]" />
        <Image
          src={"/landingpage/Vector_Layanan_Informasi.png"}
          width={69}
          height={100}
          alt="Layanan Informasi Vector"
          className="w-[3.594vw] aspect-[69/100]"
        />
        <hr className="w-[48%] border-primary-100 border-[0.26vw]" />
      </div>

      <div className="grid grid-cols-3 gap-[4.948vw]">
        {layananList.map((item, index) => (
          <LayananInformasiCard
            key={index}
            {...item}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default LayananInformasi;
