"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { DrinkMenuCategory } from "@/lib/drinks-menu";

export function DrinksMenuGrid({ category }: { category: DrinkMenuCategory }) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="font-display text-3xl text-champagne">{category.title}</p>
        <div className="h-px w-full max-w-2xl bg-gradient-to-r from-amber/50 via-white/10 to-transparent" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {category.items.map((item, index) => (
          <motion.article
            key={item.imageSrc}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.28, delay: index * 0.03 }}
            whileHover={{ scale: 1.02, y: -6 }}
            className="premium-border glass-panel group overflow-hidden rounded-[2rem] p-4 transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(0,0,0,0.38)]"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(212,164,93,0.2),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="px-2 pb-2 pt-4">
              <p className="font-display text-2xl leading-tight text-white">{item.name}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
