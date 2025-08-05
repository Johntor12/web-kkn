"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface StatisticCardProps {
  value: string;
  unit?: string;
  label: string;
  width: string;
  height: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  value,
  unit,
  label,
  width,
  height,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className={`relative ${height} ${width}`}>
      {/* Angka - Muncul dari kiri */}
      <motion.header
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="flex absolute top-8 left-0 flex-col shrink-0 justify-center text-8xl font-bold text-center h-[223px] leading-[68px] w-full"
      >
        <h1 className="text-8xl font-bold max-md:text-7xl max-sm:text-5xl bg-gradient-to-b from-[#1B4526] via-[#1B4526] to-[#43AB5E] text-transparent bg-clip-text">
          {value}
          {unit && <span className="text-6xl">{unit}</span>}
        </h1>
      </motion.header>

      {/* Label - Muncul dari kanan */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex absolute left-0 top-40 flex-col shrink-0 justify-center text-6xl font-bold text-center h-[223px] leading-[68px] w-full"
      >
        <h2 className="text-6xl font-bold max-md:text-5xl max-sm:text-4xl bg-gradient-to-b from-[#1B4526] via-[#1B4526] to-[#43AB5E] text-transparent bg-clip-text">
          {label}
        </h2>
      </motion.div>
    </section>
  );
};

const StatisticsDisplay: React.FC = () => {
  return (
    <main>
      <div className="flex gap-64 items-center">
        <StatisticCard
          value="XX ribu"
          label="Penduduk"
          width="w-[374px]"
          height="h-[335px]"
        />
        <StatisticCard
          value="XX km"
          unit="2"
          label="Luas Wilayah"
          width="w-[410px]"
          height="h-[335px]"
        />
      </div>
    </main>
  );
};

export default StatisticsDisplay;
