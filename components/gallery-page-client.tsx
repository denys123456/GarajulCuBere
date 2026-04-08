"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";

type GalleryItem = {
  id: string;
  title: string;
  image: string;
  url?: string;
};

export function GalleryPageClient({
  initialItems,
  isAdmin
}: {
  initialItems: GalleryItem[];
  isAdmin: boolean;
}) {
  const [images, setImages] = useState(initialItems);
  const [error, setError] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  useEffect(() => {
    let active = true;

    async function loadImages() {
      const response = await fetch("/api/gallery", { cache: "no-store" });
      const data = await response.json().catch(() => null);

      if (!active || !response.ok) {
        return;
      }

      setImages((data?.items ?? []).map((item: GalleryItem) => ({ ...item, image: item.url ?? item.image })));
    }

    loadImages();

    return () => {
      active = false;
    };
  }, []);

  async function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "Nu am putut incarca imaginea.");
      setUploading(false);
      return;
    }

    setUploadedUrl(data?.url ?? "");
    setUploading(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!uploadedUrl) {
      setError("Imaginea galeriei lipseste. Incarca imaginea mai intai.");
      setLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();

    const response = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        url: uploadedUrl
      })
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "Nu am putut salva imaginea.");
      setLoading(false);
      return;
    }

    const created = data?.item ? { ...data.item, image: data.item.url ?? data.item.image } : null;
    if (created) {
      setImages((current) => [created, ...current]);
    }
    event.currentTarget.reset();
    setUploadedUrl("");
    setPanelOpen(false);
    setLoading(false);
  }

  async function onDelete(id: string) {
    setDeletingId(id);
    setError("");

    const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "Nu am putut sterge imaginea.");
      setDeletingId(null);
      return;
    }

    setImages((current) => current.filter((item) => item.id !== id));
    setDeletingId(null);
  }

  return (
    <>
      {isAdmin && (
        <div className="mt-8 flex justify-end">
          <button type="button" onClick={() => setPanelOpen((open) => !open)} className="cta-primary">
            Adaugă imagine
          </button>
        </div>
      )}

      {isAdmin && panelOpen && (
        <div className="mt-6 glass-panel rounded-[2rem] p-6">
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="grid gap-2 text-sm text-ink/72">
              Titlu
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
                accept="image/*"
                required
                onChange={onImageChange}
                className="rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b78b47]"
              />
            </label>
            <button type="submit" disabled={loading || uploading} className="cta-primary">
              {loading || uploading ? "Se procesează..." : "Upload"}
            </button>
          </form>
          {error && <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        </div>
      )}

      <Reveal className="mt-10">
        <GalleryGrid items={images} isAdmin={isAdmin} deletingId={deletingId} onDelete={onDelete} />
      </Reveal>
    </>
  );
}
