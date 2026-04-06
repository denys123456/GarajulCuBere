"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

type GalleryItem = {
  title: string;
  image: string;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, index) => (
          <motion.button
            type="button"
            key={item.title}
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative mb-4 block w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={900}
              height={1200}
              className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <p className="absolute bottom-5 left-5 font-display text-2xl text-champagne">{item.title}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/40"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55"
              >
                <X className="h-5 w-5" />
              </button>
              <Image src={active.image} alt={active.title} width={1600} height={1200} className="h-auto w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
