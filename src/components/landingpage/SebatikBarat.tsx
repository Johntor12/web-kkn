"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const WelcomePage = () => {
  const text1 = "SEBATIK";
  const text2 = "BARAT";

  const letterAnimationRight = {
    hidden: { x: 50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 1.0,
        ease: "easeOut",
      },
    }),
  };

  const letterAnimationLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 1.0,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Background full cover */}
      <Image
        src="/landingpage/background.svg"
        alt="Background"
        fill
        priority
        className="absolute inset-0 object-cover -translate-y-28 z-0"
      />

      {/* Teks tengah huruf per huruf */}
      <div className="absolute top-[10%] w-full text-center z-5">
        <div className="flex justify-center gap-[0.3vw]">
          {text1.split("").map((char, i) => (
            <motion.span
              key={`sebatik-${i}`}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterAnimationRight}
              className="font-hankenGrotesk font-black text-[12vw] text-white leading-[1.1] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div className="flex justify-center gap-[0.3vw]">
          {text2.split("").map((char, i) => (
            <motion.span
              key={`barat-${i}`}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterAnimationLeft}
              className="font-hankenGrotesk font-black text-[12vw] text-white leading-[1.1] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Gelombang bawah */}
      <div className="absolute bottom-0 left-0 w-full h-[65vh] z-20">
        <Image
          src="/landingpage/gelombang.svg"
          alt="Gelombang"
          fill
          className="object-cover translate-y-30"
        />
      </div>
    </div>
  );
};

export default WelcomePage;
