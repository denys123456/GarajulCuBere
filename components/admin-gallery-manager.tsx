"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type GalleryItem = {
  id: string;
  title: string;
  image: string;
};

export function AdminGalleryManager({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/gallery", {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Nu am putut incarca imaginea.");
      setLoading(false);
      return;
    }

    event.currentTarget.reset();
    router.refresh();
    setLoading(false);
  }

  async function onDelete(id: string) {
    setLoading(true);
    setError("");

    const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "Nu am putut sterge imaginea.");
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <div className="grid gap-6">
      <section className="glass-panel rounded-[2rem] p-8">
        <p className="section-kicker">Galerie</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Gestionare imagini galerie</h2>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="grid gap-2 text-sm text-ink/72">
            Titlu imagine
            <input
              name="title"
              required
              className="rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 outline-none transition focus:border-[#b78b47]"
            />
          </label>
          <label className="grid gap-2 text-sm text-ink/72">
            Imagine
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              className="rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b78b47]"
            />
          </label>
          <button type="submit" disabled={loading} className="cta-primary">
            {loading ? "Se proceseaza..." : "Incarca imagine"}
          </button>
        </form>

        {error && <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      </section>

      <section className="glass-panel rounded-[2rem] p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-kicker">Galerie</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Imagini existente</h2>
          </div>
          <span className="rounded-full bg-[#f5efe6] px-4 py-2 text-sm text-ink/65">{items.length} imagini</span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-[#e5d8c5] bg-white">
              <div className="relative h-56">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  disabled={loading}
                  className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
                >
                  Sterge
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
