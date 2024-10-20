import AnimatedText from "@/components/animation/AnimatedText";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col justify-center items-center">
        <div className="overflow-hidden">
          <Image
            src={
              "https://res.cloudinary.com/dzktdrw7o/image/upload/v1711777808/open-data-next-app/_Users_hsw7308_Desktop_Images_illustration_seoul-skyline-line-art-vector-260nw-2283667917_l8qyks.png"
            }
            alt=""
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* <Link href={"/open-data"}>서울시 공공 데이터</Link> */}
        <AnimatedText text="서울시 공공 데이터" />
      </section>
    </main>
  );
}
