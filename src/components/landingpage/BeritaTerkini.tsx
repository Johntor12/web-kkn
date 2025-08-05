"use client";
import * as React from "react";
import { useRouter } from "next/navigation"; // ✅ Tambahkan router

interface NewsCardProps {
  imageUrl: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  onReadMore?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  imageUrl,
  category,
  title,
  date,
  excerpt,
  onReadMore,
}) => {
  return (
    <article className="absolute shrink-0 rounded-2xl border-4 border-blue-600 border-solid bg-zinc-100 h-[650px] left-[366px] top-[127px] w-[451px] max-md:relative max-md:top-0 max-md:left-0 max-md:pb-8 max-md:mx-auto max-md:my-0 max-md:w-full max-md:h-auto max-md:max-w-[500px] max-sm:rounded-xl max-sm:border-[3px]">
      <img
        src={imageUrl}
        alt=""
        className="absolute top-4 shrink-0 rounded-lg h-[286px] left-[17px] w-[417px] max-md:object-cover max-md:top-4 max-md:h-[250px] max-md:left-[17px] max-md:w-[calc(100%_-_34px)] max-sm:rounded-md max-sm:h-[200px]"
      />
      <div className="absolute h-3 text-xs leading-3 text-red-600 left-[34px] top-[325px] w-[74px]">
        {category}
      </div>
      <h2 className="absolute text-2xl leading-6 h-[47px] left-[34px] text-neutral-400 top-[354px] w-[333px]">
        {title}
      </h2>
      <time className="absolute h-6 text-xs leading-6 left-[34px] text-zinc-600 top-[405px] w-auto">
        {date}
      </time>
      <p className="absolute text-base leading-5 text-black h-[120px] left-[34px] top-[429px] w-[400px] max-md:h-auto">
        {excerpt}
      </p>
      <button
        onClick={onReadMore}
        className="absolute h-4 text-base leading-4 text-red-600 underline cursor-pointer decoration-auto decoration-solid left-[34px] top-[566px] underline-offset-auto w-auto hover:text-red-700 transition-colors"
      >
        Read More
      </button>
    </article>
  );
};

const BackgroundEffect: React.FC = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          '<svg id="229:91" width="956" height="591" viewBox="0 0 956 591" fill="none" xmlns="http://www.w3.org/2000/svg" class="background-blur" style="width: 756px; height: 391px; flex-shrink: 0; fill: rgba(55, 115, 187, 0.10); filter: blur(50px); position: absolute; left: 216px; top: 581px"><g filter="url(#filter0_f_229_91)"><path d="M100 100L213.5 491H716L856 100H100Z" fill="#3773BB" fill-opacity="0.1"></path></g><defs><filter id="filter0_f_229_91" x="0" y="0" width="956" height="591" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_229_91"></feGaussianBlur></filter></defs></svg>',
      }}
    />
  );
};

interface SideImagesProps {
  leftImageUrl: string;
  rightImageUrl: string;
}

const SideImages: React.FC<SideImagesProps> = ({
  leftImageUrl,
  rightImageUrl,
}) => {
  return (
    <>
      <img
        src={leftImageUrl}
        alt=""
        className="absolute left-0 shrink-0 h-[625px] top-[152px] w-[560px] max-md:hidden"
      />
      <img
        src={rightImageUrl}
        alt=""
        className="absolute shrink-0 h-[625px] left-[612px] top-[152px] w-[560px] max-md:hidden"
      />
    </>
  );
};

interface BeritaTerkiniProps {
  title?: string;
  newsData?: {
    imageUrl: string;
    category: string;
    title: string;
    date: string;
    excerpt: string;
  };
  sideImages?: {
    left: string;
    right: string;
  };
  onReadMore?: () => void;
}

const BeritaTerkini: React.FC<BeritaTerkiniProps> = ({
  title = "Berita Terkini",
  newsData = {
    imageUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/d96d00ed8449ae278abdec65fa9dda93fc2b863f?width=834",
    category: "Entertainment",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    date: "26 Agustus 2028",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  sideImages = {
    left: "https://api.builder.io/api/v1/image/assets/TEMP/1d3681488163815185d25f1cc4ee56666439a5a6?width=1120",
    right:
      "https://api.builder.io/api/v1/image/assets/TEMP/f0f70c3049ac289cd7961f793166c051e212e3fd?width=1120",
  },
}) => {
  const router = useRouter(); // ✅ Gunakan router dari Next.js

  const handleReadMore = () => {
    router.push("/berita"); // ✅ Navigasi ke halaman /berita
  };

  return (
    <section className="relative mx-auto my-0 h-[972px] w-[1172px] max-md:p-5 max-md:w-full max-md:max-w-screen-md max-md:h-auto max-sm:p-4">
      <header className="absolute top-0 text-5xl font-bold text-center h-[59px] left-[413px] text-stone-950 w-[331px] max-md:relative max-md:top-0 max-md:left-0 max-md:mb-10 max-md:w-full max-md:text-4xl max-md:text-center max-sm:mb-8 max-sm:text-3xl">
        <h1>{title}</h1>
      </header>

      <BackgroundEffect />
      <SideImages
        leftImageUrl={sideImages.left}
        rightImageUrl={sideImages.right}
      />
      <NewsCard
        imageUrl={newsData.imageUrl}
        category={newsData.category}
        title={newsData.title}
        date={newsData.date}
        excerpt={newsData.excerpt}
        onReadMore={handleReadMore}
      />
    </section>
  );
};

export default BeritaTerkini;
