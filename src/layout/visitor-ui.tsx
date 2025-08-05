import React from "react";
import Header from "@/components/layout/header"; // Pastikan path-nya benar
import Footer from "@/components/layout/footer";

export default function VisitorLayoutUI({ children }: { children: React.ReactNode }) {
    return (
        <div className="antialiased flex flex-col min-h-screen">
            {/* HEADER selalu di atas */}
            <Header />
            <div className="flex-grow">
                {children}
            </div>
            {/* FOOTER akan selalu menempel di bawah */}
            <Footer />

        </div>
    )
}