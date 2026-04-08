import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { slugify } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { safeCreateEvent, safeEventSelect, safeUpdateEvent, withEventDefaults } from "@/lib/event-records";

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
const useDatabaseStore = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

async function ensureEventsFile() {
  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, "[]");
  }
}

export async function getStoredEvents() {
  if (useDatabaseStore) {
    try {
      const events = await prisma.event.findMany({
        select: safeEventSelect,
        orderBy: {
          date: "asc"
        }
      });

      return events.map((event) => {
        const normalized = withEventDefaults(event);

        return {
          ...normalized,
          date: new Date(normalized.date).toISOString()
        };
      });
    } catch (error) {
      console.error("getStoredEvents prisma failed", error);
      return [];
    }
  }

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
  const nextEvent = normalizeEventPayload(payload);

  if (useDatabaseStore) {
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

    return nextEvent;
  }

  const events = await getStoredEvents();
  events.push(nextEvent);
  await saveStoredEvents(events);

  return nextEvent;
}

export async function updateStoredEvent(id: string, payload: EventPayload) {
  const nextEvent = normalizeEventPayload(payload, id);

  if (useDatabaseStore) {
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

      return nextEvent;
    } catch (error) {
      console.error("updateStoredEvent prisma failed", error);
      return null;
    }
  }

  const events = await getStoredEvents();
  const index = events.findIndex((event) => event.id === id);

  if (index === -1) {
    return null;
  }

  events[index] = nextEvent;
  await saveStoredEvents(events);

  return nextEvent;
}

export async function deleteStoredEvent(id: string) {
  if (useDatabaseStore) {
    try {
      await prisma.event.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error("deleteStoredEvent prisma failed", error);
      return false;
    }
  }

  const events = await getStoredEvents();
  const nextEvents = events.filter((event) => event.id !== id);

  if (nextEvents.length === events.length) {
    return false;
  }

  await saveStoredEvents(nextEvents);

  return true;
}

export async function getStoredEventById(id: string) {
  if (useDatabaseStore) {
    try {
      const event = await prisma.event.findUnique({
        where: { id },
        select: safeEventSelect
      });

      if (!event) {
        return null;
      }

      const normalized = withEventDefaults(event);

      return {
        ...normalized,
        date: new Date(normalized.date).toISOString()
      };
    } catch (error) {
      console.error("getStoredEventById prisma failed", error);
      return null;
    }
  }

  const events = await getStoredEvents();
  return events.find((event) => event.id === id) ?? null;
}

export async function getStoredEventBySlug(slug: string) {
  if (useDatabaseStore) {
    try {
      const event = await prisma.event.findUnique({
        where: { slug },
        select: safeEventSelect
      });

      if (!event) {
        return null;
      }

      const normalized = withEventDefaults(event);

      return {
        ...normalized,
        date: new Date(normalized.date).toISOString()
      };
    } catch (error) {
      console.error("getStoredEventBySlug prisma failed", error);
      return null;
    }
  }

  const events = await getStoredEvents();
  return events.find((event) => event.slug === slug) ?? null;
}
