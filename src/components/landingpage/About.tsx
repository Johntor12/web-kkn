import Link from "next/link";

const ProfilPemerintahan = () => {
  const links = [
    { text: "Visi & Misi", path: "/visimisi" },
    { text: "Struktur Organisasi", path: "/strukturorganisasi" },
  ];

  return (
    <div className="flex flex-col w-[45.573vw] gap-[0.833vw]">
      <h1 className="font-montserrat font-semibold text-[1.999vw] text-[#1B4526]">
        Profil Pemerintahan
      </h1>
      <div className="font-fustat text-gray-secondary text-[1.111vw]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        quisquam iste delectus! Veritatis reprehenderit facilis et eum quibusdam
        nobis, maiores quidem sit cumque sed ducimus dolorem consequatur
        aspernatur blanditiis doloremque.
      </div>
      <div className="flex flex-row mt-[0.833vw] gap-[1.833vw]">
        {links.map(({ text, path }) => (
          <Link
            key={text}
            href={path}
            className="group relative overflow-hidden z-0 flex cursor-pointer justify-center items-center w-[9.74vw] aspect-[187/48] rounded-[0.208vw] bg-gradient-to-b from-[#1B4526] via-[#1B4526] to-[#43AB5E] font-montserrat font-semibold text-[0.833vw] text-white transition-all duration-300"
          >
            <span className="relative z-10">{text}</span>
            {/* Layer gradasi hijau masuk dari kiri saat hover */}
            <span className="absolute inset-0 z-0 bg-[#43AB5E] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
          </Link>
        ))}
      </div>
    </div>
  );
};


const About = () => {
  return (
    <section className="flex flex-col gap-[0.625vw] min-h-[37vw]">
      <h1 className="font-montserrat text-[2.5vw] font-semibold text-primary-100 px-6">
        Tentang Sebatik Barat
      </h1>
      <div className="grid grid-cols-10 justify-center w-full p-[1.25vw]">
        <div className="relative col-span-4 flex flex-col items-center p-6 rounded-[1.563vw]">
          {/* Placeholder Image 1 */}
          <div className="absolute w-[28.646vw] aspect-square top-0 left-0  bg-[#D9D9D9] transform translate-x-4 translate-y-4 z-0 border-black border-2 rounded-[1.563vw]"></div>

          {/* Placeholder Image 2 */}
          <div className="absolute w-[28.646vw] aspect-square top-0 left-0 bg-[#D9D9D9] transform translate-x-16  translate-y-12 z-10 border-black border-2 rounded-[1.563vw]"></div>
        </div>
        <div className="col-start-5 col-span-7 px-12">
          <ProfilPemerintahan />
        </div>
      </div>
    </section>
  );
};

export default About;
