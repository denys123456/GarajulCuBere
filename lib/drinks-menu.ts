import { unstable_noStore as noStore } from "next/cache";

type MenuItem = {
  name: string;
  price: number;
  ml?: number;
};

type MenuKey =
  | "bere"
  | "bereSpeciala"
  | "vin"
  | "whiskey"
  | "rom"
  | "gin"
  | "cognac"
  | "vodka"
  | "lichior"
  | "cocktailuri"
  | "nonAlcoolice"
  | "cafea"
  | "ceai"
  | "racoritoare"
  | "energizante"
  | "apa"
  | "gustari";

export const menu: Record<MenuKey, MenuItem[]> = {
  bere: [
    { name: "Corona", price: 14, ml: 330 },
    { name: "Heineken draft", price: 12, ml: 400 },
    { name: "Heineken sticlă", price: 12, ml: 400 },
    { name: "Birra Moretti", price: 10, ml: 500 },
    { name: "Ciuc", price: 11, ml: 500 },
    { name: "Harghita", price: 8, ml: 500 },
    { name: "Estrella", price: 14, ml: 330 }
  ],
  bereSpeciala: [
    { name: "Nemțeana", price: 16, ml: 500 },
    { name: "Paulaner", price: 15, ml: 500 }
  ],
  vin: [
    { name: "Crama Purcari", price: 64, ml: 750 },
    { name: "Crama Recaș", price: 45, ml: 750 },
    { name: "Mionetto Prosecco", price: 64, ml: 750 },
    { name: "Pahar vin", price: 14, ml: 187 }
  ],
  whiskey: [
    { name: "Jack Daniels", price: 14, ml: 50 },
    { name: "Jack Daniels dublu", price: 20, ml: 100 },
    { name: "Glenfiddich 12YO", price: 20, ml: 50 },
    { name: "Chivas Regal 12YO", price: 15, ml: 50 },
    { name: "Jameson", price: 12, ml: 50 },
    { name: "Ballantine's", price: 12, ml: 50 }
  ],
  rom: [
    { name: "Diplomatico Reserva Exclusiva", price: 18, ml: 50 },
    { name: "Captain Morgan", price: 10, ml: 50 },
    { name: "Bacardi Carta Blanca", price: 10, ml: 50 },
    { name: "Bacardi Spiced", price: 10, ml: 50 },
    { name: "Bumbu", price: 20, ml: 50 }
  ],
  gin: [
    { name: "Hendrick's", price: 20, ml: 50 },
    { name: "Bulldog", price: 16, ml: 50 },
    { name: "Bombay Sapphire", price: 14, ml: 50 },
    { name: "Beefeater", price: 12, ml: 50 },
    { name: "Wembley", price: 9, ml: 50 }
  ],
  cognac: [
    { name: "Hennessy", price: 20, ml: 50 },
    { name: "Vecchia Romagna", price: 10, ml: 50 },
    { name: "Alexandrion", price: 8, ml: 50 }
  ],
  vodka: [
    { name: "Absolut", price: 10, ml: 50 },
    { name: "Finlandia", price: 10, ml: 50 }
  ],
  lichior: [
    { name: "Disaronno", price: 13, ml: 50 },
    { name: "Jagermeister", price: 10, ml: 50 },
    { name: "Aperol", price: 10, ml: 50 },
    { name: "Campari", price: 10, ml: 50 },
    { name: "Montenegro", price: 12, ml: 50 }
  ],
  cocktailuri: [
    { name: "Cuba Libre", price: 20, ml: 250 },
    { name: "Gin & Tonic", price: 20, ml: 250 },
    { name: "Hugo", price: 22, ml: 250 },
    { name: "Cosmopolitan", price: 22, ml: 250 },
    { name: "Pina Colada", price: 22, ml: 250 },
    { name: "Aperol Spritz", price: 22, ml: 250 },
    { name: "Long Island", price: 22, ml: 250 },
    { name: "Negroni", price: 22, ml: 250 }
  ],
  nonAlcoolice: [
    { name: "Green Apple", price: 18, ml: 250 },
    { name: "Kiwi Squeeze", price: 18, ml: 250 },
    { name: "Love Potion", price: 18, ml: 250 },
    { name: "Nada Colada", price: 18, ml: 250 },
    { name: "Passoa Fruit", price: 18, ml: 250 },
    { name: "Raspberry Sweet", price: 18, ml: 250 },
    { name: "Gin & Tonic 0%", price: 18, ml: 250 },
    { name: "Orange Tonic", price: 18, ml: 250 }
  ],
  cafea: [
    { name: "Espresso", price: 8, ml: 30 },
    { name: "Cappuccino", price: 10, ml: 200 },
    { name: "Latte Macchiato", price: 10, ml: 200 },
    { name: "Flat White", price: 12, ml: 200 },
    { name: "Iced Coffee", price: 12, ml: 200 },
    { name: "Frappe", price: 12, ml: 200 },
    { name: "Frappuccino", price: 15, ml: 200 },
    { name: "Caramel Frappuccino", price: 15, ml: 200 },
    { name: "Flavored Latte", price: 12, ml: 200 }
  ],
  ceai: [
    { name: "Ceai fructe de pădure", price: 10, ml: 250 },
    { name: "Ceai mentă", price: 10, ml: 250 },
    { name: "Ceai portocale", price: 10, ml: 250 },
    { name: "Ceai lămâie", price: 10, ml: 250 },
    { name: "Ceai ghimbir", price: 10, ml: 250 },
    { name: "Ceai negru", price: 10, ml: 250 }
  ],
  racoritoare: [
    { name: "Coca Cola", price: 8, ml: 250 },
    { name: "Fanta", price: 8, ml: 250 },
    { name: "Sprite", price: 8, ml: 250 },
    { name: "Cappy", price: 9, ml: 250 },
    { name: "Cappy Pulpy", price: 9, ml: 330 },
    { name: "Fuzetea", price: 9, ml: 500 },
    { name: "Schweppes", price: 8, ml: 250 },
    { name: "Aloe Vera", price: 12, ml: 500 },
    { name: "Figa", price: 14, ml: 330 }
  ],
  energizante: [
    { name: "Red Bull", price: 12, ml: 250 },
    { name: "Burn", price: 10, ml: 250 }
  ],
  apa: [
    { name: "Dorna plată", price: 7, ml: 500 },
    { name: "Dorna carbogazoasă", price: 7, ml: 500 }
  ],
  gustari: [
    { name: "Lays", price: 12 },
    { name: "Croissant Seven Days", price: 6 },
    { name: "Popcorn", price: 7 },
    { name: "Arahide", price: 10 }
  ]
};

export type DrinkMenuItem = MenuItem & {
  imageSrc: string;
};

export type DrinkMenuCategory = {
  key: MenuKey;
  title: string;
  items: DrinkMenuItem[];
};

const CATEGORY_TITLES: Record<MenuKey, string> = {
  bere: "Bere",
  bereSpeciala: "Bere speciala",
  vin: "Vin",
  whiskey: "Whiskey",
  rom: "Rom",
  gin: "Gin",
  cognac: "Cognac",
  vodka: "Vodka",
  lichior: "Lichior",
  cocktailuri: "Cocktailuri",
  nonAlcoolice: "Non alcoolice",
  cafea: "Cafea",
  ceai: "Ceai",
  racoritoare: "Racoritoare",
  energizante: "Energizante",
  apa: "Apa",
  gustari: "Gustari"
};

const MENU_IMAGES: Record<MenuKey, Record<string, string>> = {
  bere: {
    Corona: "/pics/Corona.png",
    "Heineken draft": "/pics/Heineken.png",
    "Heineken sticlă": "/pics/Heineken.png",
    "Birra Moretti": "/pics/BirraMoretti.png",
    Ciuc: "/pics/ciuc.png",
    Harghita: "/pics/harghita.png",
    Estrella: "/pics/estrella.png"
  },
  bereSpeciala: {
    "Nemțeana": "/pics/nemteana.png",
    Paulaner: "/pics/Paulaner.png"
  },
  vin: {
    "Crama Purcari": "/pics/CramaPurcari.png",
    "Crama Recaș": "/pics/CramaRecas.png",
    "Mionetto Prosecco": "/pics/MionettoProsecco.png",
    "Pahar vin": "/pics/CramaRecas.png"
  },
  whiskey: {
    "Jack Daniels": "/pics/JackDanielsWhiskey.png",
    "Jack Daniels dublu": "/pics/JackDanielsWhiskey.png",
    "Glenfiddich 12YO": "/pics/Glenfiddich12YO.png",
    "Chivas Regal 12YO": "/pics/chivasregal12yo.png",
    Jameson: "/pics/JamesonWhiskey.png",
    "Ballantine's": "/pics/Ballantines.png"
  },
  rom: {
    "Diplomatico Reserva Exclusiva": "/pics/diplomaticoreservaexclusiva.png",
    "Captain Morgan": "/pics/CapitanMorgan.png",
    "Bacardi Carta Blanca": "/pics/BacardiCartaBlanca.png",
    "Bacardi Spiced": "/pics/BacardiSpiced.png",
    Bumbu: "/pics/Bumbu.png"
  },
  gin: {
    "Hendrick's": "/pics/Hendricks.png",
    Bulldog: "/pics/bulldog.png",
    "Bombay Sapphire": "/pics/Bombay.png",
    Beefeater: "/pics/beefeatergin.png",
    Wembley: "/pics/wembley.png"
  },
  cognac: {
    Hennessy: "/pics/Hennessy.png",
    "Vecchia Romagna": "/pics/vecchiaRomagna.png",
    Alexandrion: "/pics/Alexandrion.png"
  },
  vodka: {
    Absolut: "/pics/absolutVodka.png",
    Finlandia: "/pics/FinlandiaVodka.png"
  },
  lichior: {
    Disaronno: "/pics/Disaronno.png",
    Jagermeister: "/pics/Jagermeister.png",
    Aperol: "/pics/Aperol.png",
    Campari: "/pics/Campari.png",
    Montenegro: "/pics/montenegro.png"
  },
  cocktailuri: {
    "Cuba Libre": "/pics/CubaLibre.png",
    "Gin & Tonic": "/pics/GinTonic.png",
    Hugo: "/pics/hugo.png",
    Cosmopolitan: "/pics/Cosmopolitan.png",
    "Pina Colada": "/pics/PinaColada.png",
    "Aperol Spritz": "/pics/AperolSpritz.png",
    "Long Island": "/pics/LongIsland.png",
    Negroni: "/pics/Negroni.png"
  },
  nonAlcoolice: {
    "Green Apple": "/pics/GreenApple.png",
    "Kiwi Squeeze": "/pics/kiwiSqueeze.png",
    "Love Potion": "/pics/LovePotion.png",
    "Nada Colada": "/pics/nadaColada.png",
    "Passoa Fruit": "/pics/PassioFruit.png",
    "Raspberry Sweet": "/pics/RaspberrySweet.png",
    "Gin & Tonic 0%": "/pics/ginTonic0.png",
    "Orange Tonic": "/pics/orangeTonic.png"
  },
  cafea: {
    Espresso: "/pics/Espresso.png",
    Cappuccino: "/pics/Cappucino.png",
    "Latte Macchiato": "/pics/LatteMacchiato.png",
    "Flat White": "/pics/FlatWhite.png",
    "Iced Coffee": "/pics/IcedCoffee.png",
    Frappe: "/pics/Frappe.png",
    Frappuccino: "/pics/Frappuccino.png",
    "Caramel Frappuccino": "/pics/CaramelFrappucino.png",
    "Flavored Latte": "/pics/FlavoredLatte.png"
  },
  ceai: {
    "Ceai fructe de pădure": "/pics/tea.png",
    "Ceai mentă": "/pics/tea.png",
    "Ceai portocale": "/pics/tea.png",
    "Ceai lămâie": "/pics/tea.png",
    "Ceai ghimbir": "/pics/tea.png",
    "Ceai negru": "/pics/tea.png"
  },
  racoritoare: {
    "Coca Cola": "/pics/CocaCola.png",
    Fanta: "/pics/Fanta.png",
    Sprite: "/pics/Sprite.png",
    Cappy: "/pics/Cappy.png",
    "Cappy Pulpy": "/pics/CappyPulpy.png",
    Fuzetea: "/pics/fuzetea.png",
    Schweppes: "/pics/schweppes.png",
    "Aloe Vera": "/pics/AloeVera.png",
    Figa: "/pics/figa.png"
  },
  energizante: {
    "Red Bull": "/pics/RedBull.png",
    Burn: "/pics/Burn.png"
  },
  apa: {
    "Dorna plată": "/pics/Dorna.png",
    "Dorna carbogazoasă": "/pics/Dorna.png"
  },
  gustari: {
    Lays: "/pics/lays.png",
    "Croissant Seven Days": "/pics/sevenDays.png",
    Popcorn: "/pics/Popcorn.png",
    Arahide: "/pics/arahide.png"
  }
};

const CATEGORY_ORDER: MenuKey[] = [
  "bere",
  "bereSpeciala",
  "vin",
  "whiskey",
  "rom",
  "gin",
  "cognac",
  "vodka",
  "lichior",
  "cocktailuri",
  "nonAlcoolice",
  "cafea",
  "ceai",
  "racoritoare",
  "energizante",
  "apa",
  "gustari"
];

export async function getDrinkMenuCategories(): Promise<DrinkMenuCategory[]> {
  noStore();

  return CATEGORY_ORDER.map((key) => ({
    key,
    title: CATEGORY_TITLES[key],
    items: menu[key].map((item) => ({
      ...item,
      imageSrc: MENU_IMAGES[key][item.name]
    }))
  }));
}
