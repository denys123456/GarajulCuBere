"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { DrinkMenuCategory } from "@/lib/drinks-menu";

export function DrinksMenuGrid({ category }: { category: DrinkMenuCategory }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startOffset: number;
  } | null>(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
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

  useEffect(() => {
    const updateStep = () => {
      if (!firstCardRef.current && viewportRef.current) {
        const firstCard = viewportRef.current.querySelector<HTMLElement>("[data-menu-card]");
        firstCardRef.current = firstCard;
      }

      if (firstCardRef.current) {
        setCardStep(firstCardRef.current.offsetWidth + 16);
      }
    };

    updateStep();

    if (!viewportRef.current) {
      return;
    }

    const observer = new ResizeObserver(updateStep);
    observer.observe(viewportRef.current);
    if (firstCardRef.current) {
      observer.observe(firstCardRef.current);
    }

    window.addEventListener("resize", updateStep);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStep);
    };
  }, [category.items.length]);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
    setDragOffset(0);
  }, [maxIndex]);

  const moveToIndex = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    setDragOffset(0);
    setActiveIndex(nextIndex);
  };

  const baseTranslate = -(activeIndex * cardStep);
  const trackTranslate = baseTranslate + dragOffset;

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
        ref={viewportRef}
        className="overflow-hidden pb-2"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(event) => {
          dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startOffset: dragOffset
          };
          setIsDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
            return;
          }

          const delta = event.clientX - dragStateRef.current.startX;
          setDragOffset(dragStateRef.current.startOffset + delta);
        }}
        onPointerUp={(event) => {
          if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
            return;
          }

          const projectedIndex = cardStep > 0 ? Math.round((-trackTranslate) / cardStep) : activeIndex;
          dragStateRef.current = null;
          setIsDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
          moveToIndex(projectedIndex);
        }}
        onPointerCancel={(event) => {
          if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
            return;
          }

          dragStateRef.current = null;
          setIsDragging(false);
          moveToIndex(activeIndex);
        }}
      >
        <div
          className="scrollbar-hidden flex gap-4 will-change-transform"
          style={{
            transform: `translateX(${trackTranslate}px)`,
            transition: isDragging ? "none" : "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          {category.items.map((item, index) => (
            <motion.article
              key={item.imageSrc}
              data-menu-card
              ref={index === 0 ? (node) => {
                firstCardRef.current = node;
              } : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.28, delay: index * 0.03 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group w-[calc(100%-1rem)] shrink-0 overflow-hidden rounded-[1.4rem] border border-[#e5d8c5] bg-white p-3 shadow-[0_16px_30px_rgba(67,46,21,0.07)] transition-all duration-300 hover:shadow-[0_22px_40px_rgba(67,46,21,0.12)] sm:w-[calc(50%-0.5rem)] xl:w-[calc(25%-0.75rem)]"
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
      </div>
    </section>
  );
}
