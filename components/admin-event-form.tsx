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
    date: Date | string;
    duration: string;
    startHour: string;
    location?: string | null;
    address?: string | null;
  };
};

export function AdminEventForm({ mode, event }: AdminEventFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [details, setDetails] = useState<string[]>([]);
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
    setDetails([]);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "Nu s-a putut incarca poza.");
      setDetails([]);
      setUploadingImage(false);
      return;
    }

    if (!data?.url) {
      setError("Serverul nu a returnat URL-ul imaginii incarcate.");
      setDetails([]);
      setUploadingImage(false);
      return;
    }

    setImage(data.url);
    setUploadingImage(false);
  }

  async function onSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setLoading(true);
    setError("");
    setDetails([]);

    if (!image) {
      setError("Imaginea evenimentului lipseste. Incarca o poza mai intai.");
      setDetails(["Selecteaza o imagine si asteapta finalizarea upload-ului inainte sa salvezi evenimentul."]);
      setLoading(false);
      return;
    }

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
      const rawDetails = Object.values((data?.fieldErrors ?? {}) as Record<string, string[]>).flat().filter(Boolean);
      const uniqueDetails = Array.from(new Set(rawDetails));
      setError(data?.error ?? "A aparut o eroare.");
      setDetails(uniqueDetails);
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
    setDetails([]);
    const response = await fetch(`/api/events/${event.id}`, { method: "DELETE" });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "Nu am putut sterge evenimentul.");
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

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p className="font-medium">{error}</p>
            {details.length > 0 && (
              <div className="mt-2 space-y-1 text-red-700/90">
                {details.map((detail) => (
                  <p key={detail}>• {detail}</p>
                ))}
              </div>
            )}
          </div>
        )}

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
