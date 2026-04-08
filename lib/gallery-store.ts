import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";

export type GalleryItem = {
  id: string;
  title: string;
  image: string;
};

const dataFilePath = path.join(process.cwd(), "data", "gallery-items.json");
const uploadDirectoryPath = path.join(process.cwd(), "public", "gallery", "uploads");
const useDatabaseStore = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

async function ensureGalleryStore() {
  await mkdir(path.dirname(dataFilePath), { recursive: true });
  await mkdir(uploadDirectoryPath, { recursive: true });
}

export async function getGalleryItems() {
  if (useDatabaseStore) {
    try {
      return await prisma.galleryImage.findMany({
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true,
          title: true,
          image: true
        }
      });
    } catch (error) {
      console.error("getGalleryItems prisma failed", error);
      return [];
    }
  }

  await ensureGalleryStore();
  try {
    const file = await readFile(dataFilePath, "utf8");
    const items = JSON.parse(file) as GalleryItem[];
    return items;
  } catch (error) {
    console.error("getGalleryItems failed", error);
    return [];
  }
}

async function saveGalleryItems(items: GalleryItem[]) {
  await ensureGalleryStore();
  await writeFile(dataFilePath, JSON.stringify(items, null, 2));
}

export async function createGalleryItem(input: { title: string; image: string }) {
  if (useDatabaseStore) {
    return prisma.galleryImage.create({
      data: {
        title: input.title,
        image: input.image
      },
      select: {
        id: true,
        title: true,
        image: true
      }
    });
  }

  await ensureGalleryStore();

  const items = await getGalleryItems();
  const item = {
    id: randomUUID(),
    title: input.title,
    image: input.image
  };

  items.unshift(item);
  await saveGalleryItems(items);

  return item;
}

export async function deleteGalleryItem(id: string) {
  if (useDatabaseStore) {
    try {
      await prisma.galleryImage.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error("deleteGalleryItem prisma failed", error);
      return false;
    }
  }

  const items = await getGalleryItems();
  const target = items.find((item) => item.id === id);

  if (!target) {
    return false;
  }

  const nextItems = items.filter((item) => item.id !== id);
  await saveGalleryItems(nextItems);

  if (target.image.startsWith("/gallery/uploads/")) {
    const absoluteFilePath = path.join(process.cwd(), "public", target.image.replace(/^\//, ""));
    await unlink(absoluteFilePath).catch(() => undefined);
  }

  return true;
}
