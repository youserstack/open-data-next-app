"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Header() {
  const ref = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const linkElements = ref.current as HTMLAnchorElement[];

    const tl = gsap.timeline({ delay: 3 });
    tl.fromTo(
      linkElements,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, stagger: 0.2, ease: "back.out", duration: 1.5 }
    );
  }, []);

  return (
    <header
      className="header fixed top-0 left-0 right-0 z-[100] pt-8 pb-16
      bg-gradient-to-b from-black from-70% to-transparent to-100%
       [&_a:hover]:text-white
       [&_a:hover]:bg-orange-400
       [&_a]:bg-neutral-700/50
       [&_a]:p-4 
       [&_a]:rounded-xl
       [&_a]:transition-colors
       "
    >
      <section className="max-w-screen-lg  mx-auto">
        <nav className=" flex justify-center gap-8">
          <Link
            href="/"
            ref={(el) => {
              ref.current[0] = el;
            }}
          >
            HOME
          </Link>

          <Link
            href="/open-data"
            ref={(el) => {
              ref.current[1] = el;
            }}
          >
            OPEN DATA
          </Link>
        </nav>
      </section>
    </header>
  );
}
