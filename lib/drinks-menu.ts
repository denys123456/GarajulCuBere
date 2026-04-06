import { readdir } from "fs/promises";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

type DrinkCategoryKey =
  | "beer"
  | "wine-prosecco"
  | "whiskey"
  | "vodka"
  | "gin"
  | "cocktails"
  | "coffee"
  | "soft-drinks"
  | "other";

export type DrinkMenuItem = {
  imageSrc: string;
  name: string;
};

export type DrinkMenuCategory = {
  key: DrinkCategoryKey;
  title: string;
  items: DrinkMenuItem[];
};

const CATEGORY_CONFIG: Array<{
  key: DrinkCategoryKey;
  title: string;
  keywords: string[];
}> = [
  { key: "beer", title: "Beer", keywords: ["corona", "heineken", "paulaner", "birra", "desperados"] },
  { key: "wine-prosecco", title: "Wine / Prosecco", keywords: ["prosecco", "wine", "rose"] },
  {
    key: "whiskey",
    title: "Whiskey",
    keywords: ["jack", "jameson", "chivas", "glenfiddich", "ballantines", "hennessy"]
  },
  { key: "vodka", title: "Vodka", keywords: ["absolut", "finlandia", "smirnoff"] },
  { key: "gin", title: "Gin", keywords: ["beefeater", "bombay", "hendrick"] },
  {
    key: "cocktails",
    title: "Cocktails",
    keywords: ["aperol", "pina", "mojito", "negroni", "cosmopolitan"]
  },
  {
    key: "coffee",
    title: "Coffee",
    keywords: ["espresso", "cappuccino", "latte", "frappe", "macchiato", "flatwhite"]
  },
  {
    key: "soft-drinks",
    title: "Soft Drinks",
    keywords: ["cola", "fanta", "sprite", "schweppes", "redbull"]
  },
  { key: "other", title: "Other", keywords: [] }
];

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg"]);

function getCategoryKey(filename: string): DrinkCategoryKey {
  const normalizedName = filename.toLowerCase();

  const matchedCategory = CATEGORY_CONFIG.find(
    (category) => category.key !== "other" && category.keywords.some((keyword) => normalizedName.includes(keyword))
  );

  return matchedCategory?.key ?? "other";
}

function cleanDrinkName(filename: string) {
  const baseName = filename.replace(/\.[^.]+$/, "");

  return baseName
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .replace(/(\d)([A-Za-z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function getDrinkMenuCategories(): Promise<DrinkMenuCategory[]> {
  noStore();

  const directoryPath = path.join(process.cwd(), "public", "pics");
  const entries = await readdir(directoryPath, { withFileTypes: true });

  const groupedItems = new Map<DrinkCategoryKey, DrinkMenuItem[]>();

  for (const category of CATEGORY_CONFIG) {
    groupedItems.set(category.key, []);
  }

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (!IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    const categoryKey = getCategoryKey(entry.name);
    const items = groupedItems.get(categoryKey);

    if (!items) {
      continue;
    }

    items.push({
      imageSrc: `/pics/${entry.name}`,
      name: cleanDrinkName(entry.name)
    });
  }

  return CATEGORY_CONFIG.map((category) => ({
    key: category.key,
    title: category.title,
    items: (groupedItems.get(category.key) ?? []).sort((left, right) => left.name.localeCompare(right.name))
  })).filter((category) => category.items.length > 0);
}
