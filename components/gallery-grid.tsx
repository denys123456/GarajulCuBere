"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { useState } from "react";

type GalleryItem = {
  id?: string;
  title: string;
  image: string;
};

export function GalleryGrid({
  items,
  isAdmin = false,
  deletingId,
  onDelete
}: {
  items: GalleryItem[];
  isAdmin?: boolean;
  deletingId?: string | null;
  onDelete?: (id: string) => void;
}) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-[#e5d8c5] bg-white shadow-[0_16px_30px_rgba(67,46,21,0.07)]"
          >
            <button type="button" onClick={() => setActive(item)} className="block w-full text-left">
              <div className="relative h-72 overflow-hidden bg-[#f7f0e5] sm:h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </button>
            {isAdmin && item.id && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(item.id!)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-red-700 shadow-panel"
                aria-label={`Sterge ${item.title}`}
              >
                <Trash2 className="h-4 w-4" />
                {deletingId === item.id && <span className="sr-only">Se sterge</span>}
              </button>
            )}
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#2f241c]/55 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl overflow-hidden rounded-[2rem] border border-[#e5d8c5] bg-white shadow-[0_28px_60px_rgba(47,36,28,0.18)]"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-panel"
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
