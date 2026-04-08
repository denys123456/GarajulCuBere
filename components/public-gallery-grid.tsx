"use client";

import { useEffect, useState } from "react";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";

type GalleryItem = {
  id: string;
  title: string;
  image: string;
};

export function PublicGalleryGrid({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    let active = true;

    async function loadItems() {
      const response = await fetch("/api/gallery", { cache: "no-store" });
      const data = await response.json().catch(() => null);

      if (!active || !response.ok) {
        return;
      }

      setItems(data.items ?? []);
    }

    loadItems();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Reveal className="mt-10">
      <GalleryGrid items={items} />
    </Reveal>
  );
}
