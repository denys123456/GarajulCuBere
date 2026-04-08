"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { DrinkMenuCategory, DrinkMenuItem } from "@/lib/drinks-menu";

export function DrinksMenuGrid({ category }: { category: DrinkMenuCategory }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startOffset: number;
    itemIndex: number | null;
  } | null>(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DrinkMenuItem | null>(null);
  const maxIndex = Math.max(0, category.items.length - itemsPerView);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

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
    if (typeof window === "undefined") {
      return;
    }

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

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    if (typeof document === "undefined") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

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
          const clickedCard = (event.target as HTMLElement).closest<HTMLElement>("[data-menu-card-index]");
          const itemIndex = clickedCard ? Number.parseInt(clickedCard.dataset.menuCardIndex ?? "", 10) : null;

          dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startOffset: dragOffset,
            itemIndex: Number.isNaN(itemIndex ?? Number.NaN) ? null : itemIndex
          };
          setStartX(event.clientX);
          setStartY(event.clientY);
          setIsDragging(false);
          setIsPointerDown(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
            return;
          }

          const deltaX = event.clientX - dragStateRef.current.startX;
          const deltaY = event.clientY - dragStateRef.current.startY;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance > 8 && !isDragging) {
            setIsDragging(true);
          }

          setDragOffset(dragStateRef.current.startOffset + deltaX);
        }}
        onPointerUp={(event) => {
          if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
            return;
          }

          const projectedIndex = cardStep > 0 ? Math.round((-trackTranslate) / cardStep) : activeIndex;
          const wasDrag = isDragging;
          const itemIndex = dragStateRef.current.itemIndex;
          dragStateRef.current = null;
          setStartX(null);
          setStartY(null);
          setIsPointerDown(false);
          setIsDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
          moveToIndex(projectedIndex);

          if (!wasDrag && itemIndex !== null) {
            const item = category.items[itemIndex];

            if (item) {
              setSelectedItem(item);
            }
          }
        }}
        onPointerCancel={(event) => {
          if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
            return;
          }

          dragStateRef.current = null;
          setStartX(null);
          setStartY(null);
          setIsPointerDown(false);
          setIsDragging(false);
          moveToIndex(activeIndex);
        }}
      >
        <div
          className="scrollbar-hidden flex gap-4 will-change-transform"
          style={{
            transform: `translateX(${trackTranslate}px)`,
            transition: isPointerDown ? "none" : "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          {category.items.map((item, index) => (
            <motion.article
              key={item.imageSrc}
              data-menu-card
              data-menu-card-index={index}
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

      {selectedItem && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#2f241c]/60 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-[1.75rem] border border-[#e5d8c5] bg-white p-4 opacity-100 shadow-[0_28px_60px_rgba(47,36,28,0.18)] transition-[transform,opacity] duration-250 ease-out"
            style={{ transform: "translateY(0) scale(1)", opacity: 1, transition: "transform 0.25s ease-out, opacity 0.25s ease-out" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5d8c5] bg-white text-ink"
              aria-label={`Închide ${selectedItem.name}`}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,#fbf8f3,#efe5d7)]">
              <div className="relative h-[22rem]">
                <Image
                  src={selectedItem.imageSrc}
                  alt={selectedItem.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="px-2 pb-2 pt-5">
              <p className="font-display text-3xl font-semibold text-ink">{selectedItem.name}</p>
              <p className="mt-2 text-sm leading-7 text-ink/58">{category.title}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink/62">
                <span className="rounded-full bg-[#fbf5eb] px-4 py-2">Pret: n/a</span>
                <span className="rounded-full bg-[#fbf5eb] px-4 py-2">ML: n/a</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
