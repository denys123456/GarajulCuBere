"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { DrinkMenuCategory } from "@/lib/drinks-menu";

export function DrinksMenuGrid({ category }: { category: DrinkMenuCategory }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    dragging: boolean;
  } | null>(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = Math.max(0, category.items.length - itemsPerView);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(4);
        return;
      }

      if (window.innerWidth >= 640) {
        setItemsPerView(2);
        return;
      }

      setItemsPerView(1);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const getStep = () => {
    if (!scrollerRef.current) {
      return 0;
    }

    const card = scrollerRef.current.querySelector<HTMLElement>("[data-menu-card]");
    return card ? card.offsetWidth + 16 : scrollerRef.current.clientWidth;
  };

  const moveToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    if (!scrollerRef.current) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    const step = getStep();

    setActiveIndex(nextIndex);
    scrollerRef.current.scrollTo({
      left: step * nextIndex,
      behavior
    });
  };

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
    requestAnimationFrame(() => moveToIndex(Math.min(activeIndex, maxIndex), "auto"));
  }, [itemsPerView, maxIndex]);

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
            onClick={() => moveToIndex(activeIndex - 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8cab5] bg-white/90 text-ink transition hover:bg-white"
            aria-label={`Derulează la stânga în categoria ${category.title}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => moveToIndex(activeIndex + 1)}
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
        style={{ scrollSnapType: "x mandatory", touchAction: "pan-y" }}
        onPointerDown={(event) => {
          if (!scrollerRef.current) {
            return;
          }

          dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScrollLeft: scrollerRef.current.scrollLeft,
            dragging: true
          };

          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!scrollerRef.current || !dragStateRef.current?.dragging) {
            return;
          }

          const delta = event.clientX - dragStateRef.current.startX;
          scrollerRef.current.scrollLeft = dragStateRef.current.startScrollLeft - delta;
        }}
        onPointerUp={(event) => {
          if (!scrollerRef.current || !dragStateRef.current) {
            return;
          }

          const step = getStep();
          const nextIndex = step > 0 ? Math.round(scrollerRef.current.scrollLeft / step) : activeIndex;

          dragStateRef.current.dragging = false;
          event.currentTarget.releasePointerCapture(dragStateRef.current.pointerId);
          dragStateRef.current = null;
          moveToIndex(nextIndex);
        }}
        onPointerCancel={() => {
          if (!scrollerRef.current || !dragStateRef.current) {
            return;
          }

          const step = getStep();
          const nextIndex = step > 0 ? Math.round(scrollerRef.current.scrollLeft / step) : activeIndex;

          dragStateRef.current = null;
          moveToIndex(nextIndex);
        }}
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
            className="group w-[calc(100%-1rem)] shrink-0 overflow-hidden rounded-[1.4rem] border border-[#e5d8c5] bg-white p-3 shadow-[0_16px_30px_rgba(67,46,21,0.07)] transition-all duration-300 hover:shadow-[0_22px_40px_rgba(67,46,21,0.12)] sm:w-[calc(50%-0.5rem)] xl:w-[calc(25%-0.75rem)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden rounded-[1.2rem] bg-[linear-gradient(180deg,#fbf8f3,#efe5d7)]">
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
