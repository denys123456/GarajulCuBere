import type { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const safeEventSelect = {
  id: true,
  slug: true,
  title: true,
  image: true,
  description: true,
  price: true,
  date: true,
  duration: true,
  startHour: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.EventSelect;

export type SafeEventRecord = Prisma.EventGetPayload<{
  select: typeof safeEventSelect;
}> & {
  location: string;
  address: string;
};

export function withEventDefaults<T extends Prisma.EventGetPayload<{ select: typeof safeEventSelect }>>(event: T): SafeEventRecord {
  return {
    ...event,
    location: "",
    address: ""
  };
}

export function withOptionalEventDefaults<T extends Prisma.EventGetPayload<{ select: typeof safeEventSelect }> | null>(event: T) {
  if (!event) {
    return null;
  }

  return withEventDefaults(event);
}

type EventWriteInput = {
  slug: string;
  title: string;
  image: string;
  description: string;
  price: number;
  date: Date;
  duration: string;
  startHour: string;
  location?: string;
  address?: string;
};

function getLegacyEventWriteData(input: EventWriteInput) {
  return {
    slug: input.slug,
    title: input.title,
    image: input.image,
    description: input.description,
    price: input.price,
    date: input.date,
    duration: input.duration,
    startHour: input.startHour
  };
}

function getFullEventWriteData(input: EventWriteInput) {
  return {
    ...getLegacyEventWriteData(input),
    location: input.location ?? "",
    address: input.address ?? ""
  };
}

function isMissingColumnError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("location") || message.includes("address") || message.includes("column");
}

function getEventClient(client?: PrismaClient) {
  return client ?? prisma;
}

export async function safeCreateEvent(input: EventWriteInput, client?: PrismaClient) {
  const eventClient = getEventClient(client);

  try {
    return await eventClient.event.create({
      data: getFullEventWriteData(input)
    });
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }

    return eventClient.event.create({
      data: getLegacyEventWriteData(input)
    });
  }
}

export async function safeUpdateEvent(id: string, input: EventWriteInput, client?: PrismaClient) {
  const eventClient = getEventClient(client);

  try {
    return await eventClient.event.update({
      where: { id },
      data: getFullEventWriteData(input)
    });
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }

    return eventClient.event.update({
      where: { id },
      data: getLegacyEventWriteData(input)
    });
  }
}

export async function safeUpsertEvent(input: EventWriteInput, client?: PrismaClient) {
  const eventClient = getEventClient(client);

  try {
    return await eventClient.event.upsert({
      where: { slug: input.slug },
      update: getFullEventWriteData(input),
      create: getFullEventWriteData(input)
    });
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }

    return eventClient.event.upsert({
      where: { slug: input.slug },
      update: getLegacyEventWriteData(input),
      create: getLegacyEventWriteData(input)
    });
  }
}
