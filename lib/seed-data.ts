export const seedEvents = [
  {
    slug: "garage-groove-session",
    title: "Garage Groove Session",
    image: "/gallery/event-groove.svg",
    description:
      "Seară de lounge, cocktailuri atent puse în scenă și ritmuri care cresc gradual până după miezul nopții.",
    price: 45,
    date: new Date("2026-05-09T00:00:00.000Z"),
    duration: "5 ore",
    startHour: "20:00"
  },
  {
    slug: "vinyl-cocktail-nights",
    title: "Vinyl & Cocktail Nights",
    image: "/gallery/event-vinyl.svg",
    description:
      "Selecție pe vinil, atmosferă premium de pub și un setup gândit pentru seri lungi, fără grabă.",
    price: 35,
    date: new Date("2026-05-23T00:00:00.000Z"),
    duration: "4 ore",
    startHour: "21:00"
  },
  {
    slug: "amber-sunday-social",
    title: "Amber Sunday Social",
    image: "/gallery/event-amber.svg",
    description:
      "Format relaxat pentru grupuri, servire fluidă, muzică warm-house și o atmosferă elegantă de final de weekend.",
    price: 30,
    date: new Date("2026-06-07T00:00:00.000Z"),
    duration: "6 ore",
    startHour: "18:30"
  }
] as const;

export const galleryItems = [
  {
    title: "Bar Signature",
    image: "/gallery/gallery-1.svg"
  },
  {
    title: "Lounge Flow",
    image: "/gallery/gallery-2.svg"
  },
  {
    title: "Golden Pour",
    image: "/gallery/gallery-3.svg"
  },
  {
    title: "Night Vibe",
    image: "/gallery/gallery-4.svg"
  },
  {
    title: "Cocktail Detail",
    image: "/gallery/gallery-5.svg"
  },
  {
    title: "Weekend Crowd",
    image: "/gallery/gallery-6.svg"
  }
] as const;
