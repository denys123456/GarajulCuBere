"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { MenuCategory } from "@/types";

function MenuVisual({ title }: { title: string }) {
  return (
    <div className="relative h-36 w-28 overflow-hidden rounded-[1.75rem] border border-amber/15 bg-gradient-to-br from-amber/20 via-transparent to-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.28),transparent_20%),radial-gradient(circle_at_70%_75%,rgba(212,164,93,0.3),transparent_30%)]" />
      <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
        {title}
      </div>
    </div>
  );
}

export function MenuCarousel({ category }: { category: MenuCategory }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!ref.current) {
      return;
    }

    const firstCard = ref.current.firstElementChild as HTMLElement | null;
    const gap = 16;
    const amount = firstCard ? firstCard.offsetWidth + gap : ref.current.clientWidth * 0.82;

    ref.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth"
    });
  };

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-3xl text-champagne">{category.title}</p>
          {category.subtitle && <p className="mt-1 text-sm text-white/45">{category.subtitle}</p>}
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="scrollbar-hidden flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
      >
        {category.items.map((item) => (
          <motion.article
            key={item.name}
            whileHover={{ y: -6, scale: 1.01 }}
            className="premium-border glass-panel min-w-[86%] snap-start rounded-[2rem] p-5 sm:min-w-[65%] lg:min-w-[32%]"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="space-y-4">
                <div>
                  <p className="font-display text-2xl text-white">{item.name}</p>
                  {item.subtitle && <p className="mt-1 text-sm text-white/45">{item.subtitle}</p>}
                </div>

                {item.details && <p className="max-w-md text-sm leading-6 text-white/65">{item.details}</p>}

                {item.price && <p className="text-lg font-semibold text-champagne">{item.price}</p>}

                {(item.oldPrice || item.promoPrice) && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/35 line-through">{item.oldPrice}</span>
                    <span className="rounded-full bg-amber/15 px-3 py-1 text-sm font-semibold text-champagne">
                      {item.promoPrice}
                    </span>
                  </div>
                )}

                {item.variants && (
                  <div className="grid gap-2">
                    {item.variants.map((variant) => (
                      <div
                        key={`${item.name}-${variant.label}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm"
                      >
                        <span className="text-white/72">{variant.label}</span>
                        {variant.price && <span className="font-medium text-champagne">{variant.price}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <MenuVisual title={category.title} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
