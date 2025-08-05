import Transportasi from "@/components/saranaprasarana/Transportasi";
import VisitorLayoutUI from "@/layout/visitor-ui";

export default function Home() {
  return (
    <VisitorLayoutUI>
      <div className="w-full bg-white ">
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <Transportasi />
        </div>
      </div>
    </VisitorLayoutUI>
  );
}
