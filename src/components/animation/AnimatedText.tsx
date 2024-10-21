"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedText({ text }: { text: string }) {
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const items = itemsRef.current;
    const tl = gsap.timeline();
    const tl1 = gsap.timeline({ delay: 2 });
    const tl2 = gsap.timeline({ repeat: -1 });

    tl1.fromTo(
      items,
      { opacity: 0, y: 50 },
      // { opacity: 0, y: () => (Math.random() > 0.5 ? -50 : 50) },
      { opacity: 1, y: 0, stagger: 0.1, duration: 3, ease: "elastic.out" }
    );

    tl2
      .to(items, { color: "#fcd34d", stagger: 0.1, duration: 2, ease: "circ.out" })
      .to(items, { color: "#fb923c", stagger: 0.1, duration: 2, ease: "circ.out" });

    // 타임라인 애니메이션 추가
    tl.add(tl1).add(tl2, "-=0.5");
  }, []);

  return (
    <div className="flex text-4xl md:text-7xl select-none">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="opacity-0 text-orange-400"
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
        >
          {char === " " ? "\u00A0" : char} {/* 공백을 &nbsp;로 변환 */}
        </span>
      ))}
    </div>
  );
}
