"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type AdminEventFormProps = {
  mode: "create" | "edit";
  event?: {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    date: Date;
    duration: string;
    startHour: string;
    location?: string | null;
    address?: string | null;
  };
};

export function AdminEventForm({ mode, event }: AdminEventFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(event?.image ?? "");
  const [uploadingImage, setUploadingImage] = useState(false);

  async function onImageChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    const file = changeEvent.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingImage(true);
    setError("");

    const uploadData = new FormData();
    uploadData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: uploadData
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "Nu am putut incarca imaginea.");
      setUploadingImage(false);
      return;
    }

    setImage(data.url ?? "");
    setUploadingImage(false);
  }

  async function onSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(formEvent.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      image
    };

    const response = await fetch(mode === "create" ? "/api/events" : `/api/events/${event?.id}`, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "A aparut o eroare.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function onDelete() {
    if (!event) {
      return;
    }

    setLoading(true);
    const response = await fetch(`/api/events/${event.id}`, { method: "DELETE" });

    if (!response.ok) {
      setError("Nu am putut sterge evenimentul.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const initialDate = event ? new Date(event.date).toISOString().slice(0, 10) : "";
  const inputClass =
    "rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 outline-none transition focus:border-[#b78b47]";

  return (
    <div className="glass-panel rounded-[2rem] p-8">
      <p className="section-kicker">{mode === "create" ? "New Event" : "Edit Event"}</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-ink">
        {mode === "create" ? "Create premium event" : "Update event"}
      </h1>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <label className="grid gap-2 text-sm text-ink/72">
          Title
          <input name="title" required defaultValue={event?.title} className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm text-ink/72">
          General image
          <input name="image" required value={image} readOnly className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm text-ink/72">
          Upload image
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b78b47]"
          />
        </label>
        {image && (
          <div className="overflow-hidden rounded-[1.5rem] border border-[#e5d8c5] bg-white p-3">
            <div className="relative h-56">
              <Image src={image} alt="Event preview" fill className="object-cover" />
            </div>
          </div>
        )}
        <label className="grid gap-2 text-sm text-ink/72">
          Description
          <textarea name="description" required defaultValue={event?.description} rows={5} className={inputClass} />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm text-ink/72">
            Price
            <input type="number" name="price" min={0} required defaultValue={event?.price} className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm text-ink/72">
            Date
            <input type="date" name="date" required defaultValue={initialDate} className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm text-ink/72">
            Start hour
            <input name="startHour" required placeholder="20:00" defaultValue={event?.startHour} className={inputClass} />
          </label>
        </div>
        <label className="grid gap-2 text-sm text-ink/72">
          Duration
          <input name="duration" required defaultValue={event?.duration} className={inputClass} />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-ink/72">
            Location
            <input name="location" defaultValue={event?.location ?? ""} className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm text-ink/72">
            Address
            <input name="address" defaultValue={event?.address ?? ""} className={inputClass} />
          </label>
        </div>

        {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={loading || uploadingImage} className="cta-primary">
            {loading || uploadingImage ? "Se proceseaza..." : mode === "create" ? "Add event" : "Save changes"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={onDelete}
              disabled={loading || uploadingImage}
              className="rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700"
            >
              Delete event
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
