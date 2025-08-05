"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-screen">
      {/* Gambar bayangan (hanya di-render di client untuk mencegah hydration mismatch) */}
      {isClient && (
        <div className="absolute -top-12 left-0 w-full z-50">
          <Image
            src="/footer/bayangan.svg"
            alt="Bayangan Atas Footer"
            width={1920}
            height={100}
            className="w-full h-auto"
            priority
          />
        </div>
      )}

      <footer className="relative z-0 bg-gradient-to-b from-[#0B1E13] to-[#1C4726] text-white pt-24 pb-6 px-6 sm:px-10 lg:px-20">
        <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left items-start">
          {/* Media Sosial */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Media Sosial</h2>
            <div className="flex gap-6">
              <Image src="/footer/facebook.svg" alt="Facebook" width={40} height={40} />
              <Image src="/footer/instagram.svg" alt="Instagram" width={40} height={40} />
              <Image src="/footer/youtube.svg" alt="YouTube" width={40} height={40} />
            </div>
            <h2 className="text-lg font-semibold mt-4">Presented by</h2>
            <Image src="/footer/presented.svg" alt="Presented by" width={120} height={30} />
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Kontak</h2>
            <p>Email : lorem@ipsum.com</p>
            <p>Telp  : (021) 12345678</p>
            <p>Fax   : (021) 87654321</p>
          </div>

          {/* Alamat */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Alamat</h2>
            <div className="flex items-start gap-2">
              <Image src="/footer/alamat.svg" alt="Alamat Icon" width={20} height={20} />
              <span>Jl. Contoh No.123, Jakarta, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full max-w-screen-2xl mx-auto mt-10 text-center text-sm opacity-70">
          Hak Cipta © 2025 Taka Sebatik. 
        </div>
      </footer>
    </div>
  );
};

export default Footer;
