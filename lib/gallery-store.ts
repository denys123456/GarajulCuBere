import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type GalleryItem = {
  id: string;
  title: string;
  image: string;
};

const dataFilePath = path.join(process.cwd(), "data", "gallery-items.json");
const uploadDirectoryPath = path.join(process.cwd(), "public", "gallery", "uploads");

async function ensureGalleryStore() {
  await mkdir(path.dirname(dataFilePath), { recursive: true });
  await mkdir(uploadDirectoryPath, { recursive: true });
}

export async function getGalleryItems() {
  await ensureGalleryStore();
  const file = await readFile(dataFilePath, "utf8");
  const items = JSON.parse(file) as GalleryItem[];
  return items;
}

async function saveGalleryItems(items: GalleryItem[]) {
  await ensureGalleryStore();
  await writeFile(dataFilePath, JSON.stringify(items, null, 2));
}

export async function createGalleryItem(input: { title: string; file: File }) {
  await ensureGalleryStore();

  const extension = path.extname(input.file.name) || ".jpg";
  const fileName = `${randomUUID()}${extension}`;
  const absoluteFilePath = path.join(uploadDirectoryPath, fileName);
  const arrayBuffer = await input.file.arrayBuffer();

  await writeFile(absoluteFilePath, Buffer.from(arrayBuffer));

  const items = await getGalleryItems();
  const item = {
    id: randomUUID(),
    title: input.title,
    image: `/gallery/uploads/${fileName}`
  };

  items.unshift(item);
  await saveGalleryItems(items);

  return item;
}

export async function deleteGalleryItem(id: string) {
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
