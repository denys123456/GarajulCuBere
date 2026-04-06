import { readdir } from "fs/promises";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

type DrinkCategoryKey =
  | "bere"
  | "whiskey"
  | "vodka"
  | "gin"
  | "rom"
  | "lichior-aperitiv"
  | "cocktailuri"
  | "vin-prosecco"
  | "cafea"
  | "racoritoare";

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
  {
    key: "bere",
    title: "Bere",
    keywords: ["corona", "heineken", "paulaner", "birra", "desperados", "ursus", "tuborg", "carlsberg", "stella", "ciuc", "harghita", "estrella", "nemteana"]
  },
  {
    key: "whiskey",
    title: "Whiskey",
    keywords: ["jack", "jackdaniels", "jameson", "chivas", "glenfiddich", "ballantines", "bushmills", "tullamore", "hennessy"]
  },
  {
    key: "vodka",
    title: "Vodka",
    keywords: ["absolut", "finlandia", "smirnoff", "belvedere", "greygoose"]
  },
  {
    key: "gin",
    title: "Gin",
    keywords: ["bombay", "hendrick", "hendricks", "beefeater", "tanqueray", "bulldog", "wembley", "gintonic"]
  },
  {
    key: "rom",
    title: "Rom",
    keywords: ["bacardi", "bumbu", "captainmorgan", "capitanmorgan", "havana", "diplomatico"]
  },
  {
    key: "lichior-aperitiv",
    title: "Lichior & Aperitiv",
    keywords: ["aperol", "campari", "jagermeister", "baileys", "disaronno", "montenegro", "alexandrion", "vecchiaromagna"]
  },
  {
    key: "cocktailuri",
    title: "Cocktailuri",
    keywords: ["cosmopolitan", "cubalibre", "mojito", "pinacolada", "hugo", "negroni", "longisland", "sexonthebeach", "spritz", "nadacolada", "greenapple", "kiwisqueeze", "lovepotion", "passiofruit", "raspberrysweet", "orangetonic"]
  },
  {
    key: "vin-prosecco",
    title: "Vin & Prosecco",
    keywords: ["prosecco", "wine", "rose", "merlot", "chardonnay", "cramapurcari", "cramarecas"]
  },
  {
    key: "cafea",
    title: "Cafea",
    keywords: ["espresso", "cappuccino", "cappucino", "latte", "frappe", "frappuccino", "frappucino", "macchiato", "flatwhite", "coffee", "hotchocolate"]
  },
  {
    key: "racoritoare",
    title: "Răcoritoare",
    keywords: ["cola", "coca", "fanta", "sprite", "schweppes", "redbull", "juice", "cappy", "burn", "fuzetea", "aloevera", "dorna", "orangefresh", "lemonade", "tea", "figa", "tonic"]
  }
];

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg"]);

const FORCED_CATEGORY_BY_FILE: Record<string, DrinkCategoryKey> = {
  "aperolspritz.png": "cocktailuri",
  "arahide.png": "racoritoare",
  "lays.png": "racoritoare",
  "popcorn.png": "racoritoare",
  "sevendays.png": "racoritoare"
};

const REMOVED_FILES = new Set(["logo.png", "logo.jpg", "logo.jpeg", "logo.svg"]);

const NAME_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bCappucino\b/gi, "Cappuccino"],
  [/\bFrappucino\b/gi, "Frappuccino"],
  [/\bCapitan Morgan\b/gi, "Captain Morgan"],
  [/\bCoca Cola\b/gi, "Coca-Cola"],
  [/\bGin Tonic\b/gi, "Gin Tonic"],
  [/\bJack Daniels\b/gi, "Jack Daniels"],
  [/\bBallantines\b/gi, "Ballantines"]
];

function normalizeFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "");
}

function getCategoryKey(filename: string): DrinkCategoryKey {
  const normalizedName = normalizeFilename(filename);
  const forcedCategory = FORCED_CATEGORY_BY_FILE[`${normalizedName}.png`];

  if (forcedCategory) {
    return forcedCategory;
  }

  for (const category of CATEGORY_CONFIG) {
    if (category.keywords.some((keyword) => normalizedName.includes(normalizeFilename(keyword)))) {
      return category.key;
    }
  }

  if (
    normalizedName.includes("gin") ||
    normalizedName.includes("tonic")
  ) {
    return "gin";
  }

  if (
    normalizedName.includes("fresh") ||
    normalizedName.includes("water") ||
    normalizedName.includes("zero")
  ) {
    return "racoritoare";
  }

  if (
    normalizedName.includes("pack") ||
    normalizedName.includes("bottle")
  ) {
    const withoutPack = normalizedName.replace(/pack|bottle/g, "");

    for (const category of CATEGORY_CONFIG) {
      if (category.keywords.some((keyword) => withoutPack.includes(normalizeFilename(keyword)))) {
        return category.key;
      }
    }
  }

  return "racoritoare";
}

function cleanDrinkName(filename: string) {
  const baseName = filename.replace(/\.[^.]+$/, "");

  const formattedName = baseName
    .replace(/Pack/gi, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d+)/g, "$1 $2")
    .replace(/(\d+)([A-Za-z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\bVodka\b/gi, "")
    .replace(/\bWhiskey\b/gi, "")
    .replace(/\bGin\b$/gi, "")
    .replace(/\bYo\b/gi, "YO")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part) || part === "YO" || part === "XL") {
        return part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(" ");

  return NAME_REPLACEMENTS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    formattedName
  );
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

    if (!IMAGE_EXTENSIONS.has(extension) || REMOVED_FILES.has(entry.name.toLowerCase())) {
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
    items: (groupedItems.get(category.key) ?? []).sort((left, right) => left.name.localeCompare(right.name, "ro"))
  })).filter((category) => category.items.length > 0);
}
