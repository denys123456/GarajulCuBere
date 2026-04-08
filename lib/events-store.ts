import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { slugify } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { safeCreateEvent, safeUpdateEvent } from "@/lib/event-records";

export type StoredEvent = {
  id: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  price: number;
  date: string;
  duration: string;
  startHour: string;
  location: string;
  address: string;
};

const filePath = path.join(process.cwd(), "data", "events.json");

async function ensureEventsFile() {
  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, "[]");
  }
}

export async function getStoredEvents() {
  await ensureEventsFile();

  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content) as StoredEvent[];
  } catch (error) {
    console.error("getStoredEvents failed", error);
    return [];
  }
}

async function saveStoredEvents(events: StoredEvent[]) {
  await ensureEventsFile();
  await writeFile(filePath, JSON.stringify(events, null, 2));
}

type EventPayload = {
  title: string;
  image: string;
  description: string;
  price: number;
  date: string;
  duration: string;
  startHour: string;
  location?: string;
  address?: string;
};

function normalizeEventPayload(payload: EventPayload, id?: string): StoredEvent {
  return {
    id: id ?? randomUUID(),
    slug: slugify(payload.title),
    title: payload.title,
    image: payload.image,
    description: payload.description,
    price: payload.price,
    date: payload.date,
    duration: payload.duration,
    startHour: payload.startHour,
    location: payload.location ?? "",
    address: payload.address ?? ""
  };
}

export async function createStoredEvent(payload: EventPayload) {
  const events = await getStoredEvents();
  const nextEvent = normalizeEventPayload(payload);

  events.push(nextEvent);
  await saveStoredEvents(events);

  try {
    await safeCreateEvent({
      id: nextEvent.id,
      slug: nextEvent.slug,
      title: nextEvent.title,
      image: nextEvent.image,
      description: nextEvent.description,
      price: nextEvent.price,
      date: new Date(nextEvent.date),
      duration: nextEvent.duration,
      startHour: nextEvent.startHour,
      location: nextEvent.location,
      address: nextEvent.address
    });
  } catch (error) {
    console.error("createStoredEvent prisma sync failed", error);
  }

  return nextEvent;
}

export async function updateStoredEvent(id: string, payload: EventPayload) {
  const events = await getStoredEvents();
  const index = events.findIndex((event) => event.id === id);

  if (index === -1) {
    return null;
  }

  const nextEvent = normalizeEventPayload(payload, id);
  events[index] = nextEvent;
  await saveStoredEvents(events);

  try {
    await safeUpdateEvent(id, {
      slug: nextEvent.slug,
      title: nextEvent.title,
      image: nextEvent.image,
      description: nextEvent.description,
      price: nextEvent.price,
      date: new Date(nextEvent.date),
      duration: nextEvent.duration,
      startHour: nextEvent.startHour,
      location: nextEvent.location,
      address: nextEvent.address
    });
  } catch (error) {
    console.error("updateStoredEvent prisma sync failed", error);
  }

  return nextEvent;
}

export async function deleteStoredEvent(id: string) {
  const events = await getStoredEvents();
  const nextEvents = events.filter((event) => event.id !== id);

  if (nextEvents.length === events.length) {
    return false;
  }

  await saveStoredEvents(nextEvents);

  try {
    await prisma.event.delete({ where: { id } });
  } catch (error) {
    console.error("deleteStoredEvent prisma sync failed", error);
  }

  return true;
}

export async function getStoredEventById(id: string) {
  const events = await getStoredEvents();
  return events.find((event) => event.id === id) ?? null;
}

export async function getStoredEventBySlug(slug: string) {
  const events = await getStoredEvents();
  return events.find((event) => event.slug === slug) ?? null;
}
