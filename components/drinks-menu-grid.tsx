"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { DrinkMenuCategory } from "@/lib/drinks-menu";

export function DrinksMenuGrid({ category }: { category: DrinkMenuCategory }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (direction: "left" | "right") => {
    if (!scrollerRef.current) {
      return;
    }

    const card = scrollerRef.current.querySelector<HTMLElement>("[data-menu-card]");
    const gap = 16;
    const amount = card ? (card.offsetWidth + gap) * 4 : scrollerRef.current.clientWidth;

    scrollerRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth"
    });
  };

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink">{category.title}</p>
          <div className="section-divider max-w-2xl" />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByPage("left")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8cab5] bg-white/90 text-ink transition hover:bg-white"
            aria-label={`Derulează la stânga în categoria ${category.title}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage("right")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8cab5] bg-white/90 text-ink transition hover:bg-white"
            aria-label={`Derulează la dreapta în categoria ${category.title}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="scrollbar-hidden flex gap-4 overflow-x-auto pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {category.items.map((item, index) => (
          <motion.article
            key={item.imageSrc}
            data-menu-card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.28, delay: index * 0.03 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="group w-[calc(100%-1rem)] shrink-0 overflow-hidden rounded-2xl border border-[#e5d8c5] bg-white p-3 shadow-[0_16px_30px_rgba(67,46,21,0.07)] transition-all duration-300 hover:shadow-[0_22px_40px_rgba(67,46,21,0.12)] sm:w-[calc(50%-0.5rem)] xl:w-[calc(25%-0.75rem)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#fbf8f3,#efe5d7)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#3e3025]/8 via-transparent to-white/35" />
              <div className="relative h-52">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="px-2 pb-2 pt-4">
              <p className="font-display text-xl font-semibold leading-tight text-ink">{item.name}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
