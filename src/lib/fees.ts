/** Opłata rezerwacyjna Monte Lux — nie zaliczka na pobyt. Reszta u gospodarza. */

export const BOOKING_FEE_EUR = {
  hotel: 5,
  car: 5,
  tourPerPerson: 2.5,
  restaurant: 0,
  property: 0,
} as const;

export const HOST_CONFIRM_HOURS = {
  hotel: 24,
  car: 12,
  tour: 12,
} as const;

/** Katalog: Monte Lux wkleja ręcznie. Host przysyła materiały. */
export const MAX_LISTING_PHOTOS = 6;
export const FREE_LISTING_YEARS = 2;

/** Nieruchomości — boutique concierge, nie prowizja 3% i nie OLX. */
export const PROPERTY_SERVICES = [
  {
    id: "legal",
    title: "Weryfikacja i legalizacja",
    hint: "Audyt ksiąg i tytułu. Czy obiekt jest czysty i da się go zalegalizować.",
    eur: 150,
  },
  {
    id: "visit",
    title: "Wizja lokalna z raportem",
    hint: "Jedziemy na miejsce. Wideocall, zdjęcia, czy oferta jest realna.",
    eur: 200,
  },
  {
    id: "negotiate",
    title: "Negocjacje i umowa przedwstępna",
    hint: "Negocjacje ceny. Sprawdzenie dokumentów pod umowę przedwstępną.",
    eur: 500,
  },
  {
    id: "notary",
    title: "Asysta notarialna",
    hint: "Akt w prawie lokalnym, przeprowadzenie przez podpis. Tłumacz — osobno.",
    eur: 500,
  },
  {
    id: "translator",
    title: "Tłumacz przysięgły",
    hint: "Umówienie tłumacza przysięgłego przy akcie. Płatne osobno od asysty.",
    eur: 180,
  },
] as const;
