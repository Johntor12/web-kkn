"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ---------------------- Logo ----------------------
interface LogoSectionProps {
  title: string;
}

function LogoSection({ title }: LogoSectionProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-[3.5rem] h-[3.5rem] sm:w-[4.5rem] sm:h-[4.5rem]">
        <Image
          src="/landingpage/logo.svg"
          alt="Logo Sebatik Barat"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap">
        {title}
      </h1>
    </div>
  );
}

// ---------------------- Navigation ----------------------
interface MenuItem {
  label: string;
  path?: string;
  submenu?: {
    label: string;
    path: string;
  }[];
}

const navigationItems: MenuItem[] = [
  {
    label: "Profil",
    submenu: [
      { label: "Visi dan Misi", path: "/visimisi" },
      { label: "Struktur Organisasi", path: "/strukturorganisasi" },
    ],
  },
  {
    label: "Sarana Prasarana",
    submenu: [
      { label: "Pendidikan", path: "/pendidikan" },
      { label: "Olahraga", path: "/olahraga" },
      { label: "Kesehatan", path: "/kesehatan" },
      { label: "Transportasi", path: "/transportasi" },
      { label: "Ibadah", path: "/tempatibadah" },
    ],
  },
  {
    label: "Kewilayahan",
    submenu: [
      { label: "Desa Binalawan", path: "/binalawan" },
      { label: "Desa Liang Bunyu", path: "/liangbunyu" },
      { label: "Desa Bambangan", path: "/bambangan" },
      { label: "Desa Setabu", path: "/setabu" },
    ],
  },
  { label: "UMKM", path: "/umkm" },
  { label: "SDA", path: "/sumberdayaalam" },
  {
    label: "Budaya",
    submenu: [
      { label: "Adat Istiadat", path: "/adatistiadat" },
      { label: "Kesenian", path: "/kesenian" },
      { label: "Suku", path: "/suku" },
    ],
  },
];

function NavigationMenu({ items }: { items: MenuItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 text-base sm:text-lg md:text-xl font-semibold leading-relaxed text-white relative">
      {items.map((item, index) => (
        <li
          key={index}
          className="relative group"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {item.path ? (
            <Link
              href={item.path}
              className="cursor-pointer hover:underline whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <span className="cursor-pointer hover:underline whitespace-nowrap">
              {item.label}
            </span>
          )}

          {item.submenu && activeIndex === index && (
            <ul className="absolute right-0 top-full mt-2 bg-white text-black rounded-md shadow-lg p-2 z-50 w-max min-w-[12rem]">
              {item.submenu.map((sub, i) => (
                <li key={i} className="px-4 py-2 hover:bg-gray-100 rounded">
                  <Link href={sub.path}>{sub.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

// ---------------------- Navbar ----------------------
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isLandingPage = pathname === "/"; // hanya homepage transparan

  useEffect(() => {
    if (!isLandingPage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll(); // Cek saat load pertama
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingPage]);

  const navbarClass = isLandingPage
    ? isScrolled
      ? "bg-[#0B1E13]"
      : "bg-transparent"
    : "bg-[#0B1E13]";

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-screen ${navbarClass} border-b border-white/50 text-white transition-colors duration-300`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 lg:px-20 py-4 max-w-full">
        <LogoSection title="Sebatik Barat" />
        <NavigationMenu items={navigationItems} />
      </div>
    </nav>
  );
}

export default Navbar;
