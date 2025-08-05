"use client";
// import Image from "next/image";
import { useState } from "react";
import BeritaCard from "./BeritaCard";

const beritaList = Array.from({ length: 20 }, (_, i) => ({
  judul: `Judul ${i + 1}`,
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
}));

const Berita = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(beritaList.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = beritaList.slice(startIdx, startIdx + itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <section className="mt-16 px-6 w-full flex flex-col items-center max-w-screen-xl mx-auto">
      <h1 className="text-[3vw] font-bold text-green-900 mb-[1.5vw]">
        Berita Terkini
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {currentData.map((berita, index) => (
          <BeritaCard
            key={index}
            judul={berita.judul}
            content={berita.content}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-green-700 font-medium hover:underline disabled:opacity-40"
        >
          ← Previous
        </button>

        <div className="flex space-x-1">
          {renderPageNumbers().map((page, idx) =>
            typeof page === "number" ? (
              <button
                key={idx}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-md font-semibold text-sm ${
                  page === currentPage
                    ? "bg-green-600 text-white"
                    : "text-green-700 hover:bg-green-100"
                }`}
              >
                {page}
              </button>
            ) : (
              <span
                key={idx}
                className="w-8 h-8 flex items-center justify-center text-gray-400"
              >
                ...
              </span>
            )
          )}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-green-700 font-medium hover:underline disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default Berita;
