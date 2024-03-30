import Image from "next/image";
import "../styles/home.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <section>
        <div className="image">
          <Image
            src={
              "https://res.cloudinary.com/dzktdrw7o/image/upload/v1711777808/open-data-next-app/_Users_hsw7308_Desktop_Images_illustration_seoul-skyline-line-art-vector-260nw-2283667917_l8qyks.png"
            }
            alt=""
            width={500}
            height={500}
          />
        </div>
        <Link href={"/open-data"}>서울시 공공 데이터</Link>
      </section>
    </main>
  );
}
