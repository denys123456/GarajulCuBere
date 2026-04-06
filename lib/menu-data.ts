import type { MenuCategory } from "@/types";

export const menuCategories: MenuCategory[] = [
  {
    title: "Promotions",
    items: [
      { name: "Jack Daniel's + 4 Cola", oldPrice: "232 RON", promoPrice: "196 RON" },
      { name: "Jameson + 4 Cola", oldPrice: "200 RON", promoPrice: "168 RON" },
      { name: "Bacardi Spiced + 4 Cola", oldPrice: "172 RON", promoPrice: "140 RON" },
      { name: "Absolut + 2 Santal", oldPrice: "167 RON", promoPrice: "140 RON" },
      { name: "Finlandia + 2 Santal", oldPrice: "167 RON", promoPrice: "140 RON" },
      { name: "Beefeater + 4 Schweppes", oldPrice: "200 RON", promoPrice: "168 RON" }
    ]
  },
  {
    title: "Coffee",
    items: [
      {
        name: "Espresso",
        variants: [
          { label: "Short/Long", price: "8 RON" },
          { label: "Double Espresso", price: "9 RON" }
        ]
      },
      { name: "Cappuccino", details: "espresso, cremă de lapte", price: "10 RON" },
      { name: "Latte Macchiato", details: "espresso, cremă de lapte", price: "10 RON" },
      { name: "Flat White", details: "double espresso, cremă de lapte", price: "12 RON" },
      { name: "Iced Coffee", details: "gheață, sirop vanilie, lapte, espresso", price: "12 RON" },
      { name: "Frappe", details: "gheață, cafea solubilă, zahăr, lapte, frișcă", price: "12 RON" },
      {
        name: "Frappuccino",
        details: "gheață, sirop ciocolată, espresso, lapte, frișcă",
        price: "15 RON"
      },
      {
        name: "Caramel Frappuccino",
        details: "gheață, sirop caramel, espresso, lapte, frișcă",
        price: "15 RON"
      },
      {
        name: "Flavored Latte",
        details:
          "espresso, cremă de lapte, frișcă. Alege-ți siropul preferat: ciocolată, vanilie, caramel, cocos, turtă dulce, speculoos, alune, macadamia, tiramisu",
        price: "12 RON"
      }
    ]
  },
  {
    title: "Tea",
    items: [
      {
        name: "Ceai",
        variants: [
          { label: "Fructe de Pădure", price: "10 RON" },
          { label: "Mentă", price: "10 RON" },
          { label: "Portocale", price: "10 RON" },
          { label: "Lămâie", price: "10 RON" },
          { label: "Ghimbir", price: "10 RON" },
          { label: "Negru", price: "10 RON" }
        ]
      }
    ]
  },
  {
    title: "Hot Drinks",
    items: [
      {
        name: "Chocolate",
        variants: [
          { label: "White", price: "12 RON" },
          { label: "Dark", price: "12 RON" },
          { label: "Coconut Chocolate", price: "14 RON" },
          { label: "Banana Chocolate", price: "15 RON" }
        ]
      }
    ]
  },
  {
    title: "Cold Drinks",
    items: [
      { name: "Fresh Portocale", details: "gheață, portocale", price: "14 RON" },
      {
        name: "Limonadă",
        details: "gheață, mentă, apă, sirop zahăr, lămâie",
        variants: [
          { label: "Simplă", price: "13 RON" },
          { label: "Căpșuni", price: "15 RON" },
          { label: "Fructul Pasiunii", price: "15 RON" },
          { label: "Zmeură", price: "15 RON" }
        ]
      }
    ]
  },
  {
    title: "Cocktails",
    items: [
      { name: "Cuba Libre", details: "gheață, rom, coca cola, lime", price: "20 RON" },
      { name: "Gin & Tonic", details: "gheață, lime, gin, apă tonică", price: "20 RON" },
      {
        name: "Hugo",
        details: "gheață, lichior flori de soc, prosecco, mentă, lime",
        price: "22 RON"
      },
      {
        name: "Cosmopolitan",
        details: "gheață, triple sec, vodka, suc merișoare, lime",
        price: "22 RON"
      },
      {
        name: "Pina Colada",
        details: "gheață, rom, piure cocos, suc ananas, maraschino",
        price: "22 RON"
      },
      {
        name: "Aperol Spritz",
        details: "gheață, aperol, prosecco, apă carbogazoasă, portocală",
        price: "22 RON"
      },
      {
        name: "Long Island",
        details: "gheață, rom, tequila, triple sec, vodka, gin, coca cola, lime",
        price: "22 RON"
      },
      {
        name: "Negroni",
        details: "gheață, Campari, Gin, Rosso, Coajă portocală",
        price: "22 RON"
      }
    ]
  },
  {
    title: "Non Alcoholic",
    items: [
      {
        name: "Green Apple",
        details: "gheață, lime, mentă, suc mere verzi, sirop blue curacao",
        price: "18 RON"
      },
      { name: "Kiwi Squeeze", details: "gheață, piure kiwi, sprite, lime", price: "18 RON" },
      { name: "Love Potion", details: "gheață, piure căpșuni, suc portocale", price: "18 RON" },
      {
        name: "Nada Colada",
        details: "gheață, piure cocos, suc ananas, maraschino",
        price: "18 RON"
      },
      {
        name: "Passio Fruit",
        details: "gheață, lime, piure fructul pasiunii, suc ananas & merișoare",
        price: "18 RON"
      },
      {
        name: "Raspberry Sweet",
        details: "gheață, lime, piure zmeură, suc merișoare",
        price: "18 RON"
      },
      {
        name: "Gin & Tonic 0 (Zero Alcool)",
        details: "gheață, gin zero, apă tonică, lime",
        price: "18 RON"
      },
      { name: "Orange Tonic", price: "18 RON" }
    ]
  },
  {
    title: "Beers",
    items: [
      { name: "Corona", subtitle: "335ml", price: "14 RON" },
      {
        name: "Heineken",
        variants: [
          { label: "Draft (400ml)", price: "12 RON" },
          { label: "Sticlă (400ml)", price: "12 RON" },
          { label: "0.0% (400ml)", price: "12 RON" }
        ]
      },
      { name: "Birra Moretti", variants: [{ label: "Sticlă (500ml)", price: "10 RON" }] },
      {
        name: "Ciuc",
        variants: [
          { label: "Lămâie 0.0% (500ml)", price: "11 RON" },
          { label: "Zmeură 0.0% (500ml)", price: "11 RON" }
        ]
      },
      { name: "Harghita", subtitle: "500 ml", price: "8 RON" },
      { name: "Estrella", subtitle: "330 ml", price: "14 RON" }
    ]
  },
  {
    title: "Special Beers",
    items: [
      {
        name: "Nemțeana",
        variants: [
          { label: "Blondă (500ml)", price: "16 RON" },
          { label: "Zero (500ml)", price: "16 RON" }
        ]
      },
      { name: "Paulaner", subtitle: "500 ml", price: "15 RON" }
    ]
  },
  {
    title: "Wines",
    items: [
      {
        name: "Crama Purcari",
        subtitle: "750ml",
        variants: [
          { label: "Sauvignon Blanc", price: "64 RON" },
          { label: "Rose de Purcari", price: "64 RON" },
          { label: "Rară Neagră", price: "64 RON" }
        ]
      },
      {
        name: "Crama Recaș",
        variants: [
          { label: "Fetească Regală", price: "45 RON" },
          { label: "Rose", price: "45 RON" },
          { label: "Sauvignon Blanc", price: "10 RON" },
          { label: "Rose", price: "10 RON" },
          { label: "Cabernet Sauvignon", price: "10 RON" }
        ]
      },
      {
        name: "Mionetto Prosecco",
        variants: [
          { label: "Sticlă (750ml)", price: "64 RON" },
          { label: "Pahar (187ml)", price: "14 RON" }
        ]
      }
    ]
  },
  {
    title: "Whiskey",
    subtitle: "50ml",
    items: [
      {
        name: "Jack Daniel's",
        variants: [
          { label: "Normal", price: "14 RON" },
          { label: "Honey", price: "14 RON" },
          { label: "Gentleman", price: "16 RON" },
          { label: "Single Barrel", price: "20 RON" }
        ]
      },
      { name: "Glenfiddich 12 YO", price: "20 RON" },
      { name: "Chivas Regal 12 YO", price: "15 RON" },
      { name: "Jameson", price: "12 RON" },
      { name: "Ballantine's", price: "12 RON" }
    ]
  },
  {
    title: "Rum",
    items: [
      { name: "Diplomatico Reserva Exclusiva", price: "18 RON" },
      { name: "Captain Morgan", price: "10 RON" },
      { name: "Bacardi Carta Blanca", price: "10 RON" },
      { name: "Bacardi Spiced", price: "10 RON" },
      { name: "Bumbu", price: "20 RON" }
    ]
  },
  {
    title: "Gin",
    items: [
      { name: "Hendrick's", price: "20 RON" },
      { name: "Bulldog", price: "16 RON" },
      { name: "Bombay Sapphire", price: "14 RON" },
      { name: "Beefeater", subtitle: "50ml", price: "12 RON" },
      { name: "Wembley", price: "9 RON" }
    ]
  },
  {
    title: "Cognac & Brandy",
    items: [
      { name: "Hennessy", price: "20 RON" },
      { name: "Vecchia Romagna", price: "10 RON" },
      { name: "Alexandrion", price: "8 RON" }
    ]
  },
  {
    title: "Vodka",
    items: [
      { name: "Absolut", price: "10 RON" },
      { name: "Finlandia", price: "10 RON" }
    ]
  },
  {
    title: "Liqueur",
    items: [
      { name: "Disaronno", price: "13 RON" },
      { name: "Jagermeister", price: "10 RON" },
      { name: "Aperol", price: "10 RON" },
      { name: "Campari", price: "10 RON" },
      { name: "Montenegro", subtitle: "50 ml", price: "12 RON" }
    ]
  },
  {
    title: "Snacks",
    items: [
      {
        name: "Lays",
        variants: [
          { label: "Barbeque (140g)", price: "12 RON" },
          { label: "Brânză (140g)", price: "12 RON" },
          { label: "Sare (140g)", price: "12 RON" },
          { label: "Paprika (140g)", price: "12 RON" }
        ]
      },
      { name: "Croissant Seven Days", price: "6 RON" },
      { name: "Popcorn", variants: [{ label: "Sare", price: "7 RON" }] },
      { name: "Arahide", subtitle: "140g", price: "10 RON" }
    ]
  },
  {
    title: "Juices",
    items: [
      {
        name: "Coca Cola",
        subtitle: "250ml",
        variants: [
          { label: "Normal", price: "8 RON" },
          { label: "Zero", price: "8 RON" }
        ]
      },
      {
        name: "Fanta",
        subtitle: "250ml",
        variants: [
          { label: "Portocale", price: "8 RON" },
          { label: "Struguri", price: "7 RON" }
        ]
      },
      { name: "Sprite", subtitle: "250ml", price: "8 RON" },
      {
        name: "Cappy",
        subtitle: "250ml",
        variants: [
          { label: "Pere", price: "9 RON" },
          { label: "Vișine", price: "9 RON" },
          { label: "Piersici", price: "9 RON" },
          { label: "Portocale", price: "9 RON" },
          { label: "Portocale Roșii", price: "9 RON" }
        ]
      },
      {
        name: "Cappy Pulpy",
        subtitle: "330ml",
        variants: [
          { label: "Portocale", price: "9 RON" },
          { label: "Grefe", price: "9 RON" }
        ]
      },
      {
        name: "Fuzetea",
        subtitle: "500ml",
        variants: [
          { label: "Fructe de Pădure", price: "9 RON" },
          { label: "Lime & Mentă", price: "9 RON" },
          { label: "Piersici", price: "9 RON" },
          { label: "Lămâie", price: "9 RON" },
          { label: "Piersici Zero", price: "9 RON" }
        ]
      },
      {
        name: "Schweppes",
        variants: [
          { label: "Bitter Lemon", price: "8 RON" },
          { label: "Tonic", price: "8 RON" },
          { label: "Pink", price: "8 RON" },
          { label: "Mandarin", price: "8 RON" }
        ]
      },
      { name: "Aloe Vera", subtitle: "500ml", price: "12 RON" },
      { name: "Figa", subtitle: "330 ml", price: "14 RON" }
    ]
  },
  {
    title: "Energy Drinks",
    items: [
      { name: "Red Bull", subtitle: "250ml", price: "12 RON" },
      { name: "Burn", subtitle: "250ml", price: "10 RON" }
    ]
  },
  {
    title: "Water",
    items: [
      {
        name: "Dorna",
        subtitle: "500ml",
        variants: [
          { label: "Plată", price: "7 RON" },
          { label: "Carbogazoasă", price: "7 RON" }
        ]
      }
    ]
  }
];
