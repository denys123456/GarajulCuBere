export const seedEvents = [
  {
    slug: "summer-events",
    title: "Summer Events",
    image: "/gallery/event-amber.svg",
    description:
      "Pe 24 august 2024, Garajul cu Bere a adus in Saboani prima editie Summer Memories, cu DJ set-uri, tobe live si o atmosfera de festival in aer liber.",
    price: 0,
    date: new Date("2024-08-24T00:00:00.000Z"),
    duration: "Acces de la 20:00",
    startHour: "21:00",
    location: "Teren de Fotbal, Saboani (Neamt)",
    address: "Strada Progresului, Neamt"
  },
  {
    slug: "garage-groove-session",
    title: "Garage Groove Session",
    image: "/gallery/event-groove.svg",
    description:
      "Seara de lounge, cocktailuri atent puse in scena si ritmuri care cresc gradual pana dupa miezul noptii.",
    price: 45,
    date: new Date("2026-05-09T00:00:00.000Z"),
    duration: "5 ore",
    startHour: "20:00",
    location: "Garajul cu Bere",
    address: "Saboani, Neamt"
  },
  {
    slug: "vinyl-cocktail-nights",
    title: "Vinyl & Cocktail Nights",
    image: "/gallery/event-vinyl.svg",
    description:
      "Selectie pe vinil, atmosfera premium de pub si un setup gandit pentru seri lungi, fara graba.",
    price: 35,
    date: new Date("2026-05-23T00:00:00.000Z"),
    duration: "4 ore",
    startHour: "21:00",
    location: "Garajul cu Bere",
    address: "Saboani, Neamt"
  },
  {
    slug: "amber-sunday-social",
    title: "Amber Sunday Social",
    image: "/gallery/event-amber.svg",
    description:
      "Format relaxat pentru grupuri, servire fluida, muzica warm-house si o atmosfera eleganta de final de weekend.",
    price: 30,
    date: new Date("2026-06-07T00:00:00.000Z"),
    duration: "6 ore",
    startHour: "18:30",
    location: "Garajul cu Bere",
    address: "Saboani, Neamt"
  }
] as const;
