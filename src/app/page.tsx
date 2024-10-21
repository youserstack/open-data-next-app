"use client";

import AnimatedText from "@/components/animation/AnimatedText";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./globals.scss";

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const divElement = ref.current as HTMLDivElement;

    gsap.to(divElement, {
      filter: "blur(5px) grayscale(1) brightness(0.75)",
      duration: 2,
      ease: "circ.in",
    });
  }, []);

  return (
    <main className="mb-[200px]">
      <div
        className="
        fixed inset-0 
        bg-cover bg-no-repeat bg-center 
        bg-[url('/images/vecteezy_futuristic-circuit-board-background-3d-rendering-toned_33860056.jpg')]
        blur-0 grayscale brightness-100
        "
        ref={ref}
      ></div>

      <section className="max-w-screen-lg min-h-screen mx-auto flex flex-col justify-center items-center">
        <AnimatedText text="서울시 공공 데이터" />
      </section>
    </main>
  );
}
