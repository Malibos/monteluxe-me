export const EUR_PLN = 4.3;
export const ASSET_BASE = "https://monteluxe.me";
const a = (p: string) => `${ASSET_BASE}${p}`;

export type Place = {
  id: string;
  name: string;
  kicker: string;
  city: string;
  country: string;
  description: string;
  longDescription: string;
  eur: number;
  unit: string;
  rating?: number;
  reviews?: number;
  image: string;
  photos?: string[];
  lat: number;
  lng: number;
};

export type Dish = { name: string; note: string };
export type Restaurant = Place & { dishes: Dish[]; phone?: string };
export type Caretaker = { name: string; kind: "osoba" | "agencja"; phone: string; label: string };
export type Property = Place & { caretaker: Caretaker };
export type CarOperator = { name: string; company: string; whatsapp: string };
export type RentalCar = Place & { operator: CarOperator };

export const PICKUP_POINTS = [
  { id: "tgd", label: "Lotnisko Podgorica (TGD)", lat: 42.3594, lng: 19.2519 },
  { id: "tiv", label: "Lotnisko Tivat (TIV)", lat: 42.4044, lng: 18.7233 },
  { id: "budva", label: "Budva — centrum", lat: 42.2866, lng: 18.84 },
] as const;

export const hotels: Place[] = [
  {
    id: "kotor-bay", name: "Apartament Kotor Bay", kicker: "Kotor", city: "Kotor", country: "Czarnogóra",
    description: "Kamienny apartament nad zatoką. Taras, czerwień dachów i cisza po sezonie.",
    longDescription: "Apartament stoi w starej części Kotora, kilka minut od murów.",
    eur: 120, unit: "noc", rating: 4.9, reviews: 186,
    image: a("/places/kotor.jpg"),
    photos: [a("/places/kotor.jpg"), a("/places/apartament.jpg"), a("/places/hero.jpg"), a("/places/villa.jpg"), a("/places/stefan.jpg")],
    lat: 42.4247, lng: 18.7712,
  },
  {
    id: "perast", name: "Villa Perast", kicker: "Perast", city: "Perast", country: "Czarnogóra",
    description: "Pałacowa willa przy nabrzeżu. Palmy, kamień i widok na wyspy św. Jerzego.",
    longDescription: "Villa Perast to odnowiony pałac z XVIII wieku.",
    eur: 210, unit: "noc", rating: 4.8, reviews: 94,
    image: a("/places/apartament.jpg"), lat: 42.4866, lng: 18.6992,
  },
  {
    id: "stefan", name: "Sveti Stefan View", kicker: "Sveti Stefan", city: "Sveti Stefan", country: "Czarnogóra",
    description: "Apartament naprzeciw wyspy. Świt na przesmyku, wieczór na tarasie.",
    longDescription: "Z salonu widać cały Sveti Stefan.",
    eur: 175, unit: "noc", rating: 4.9, reviews: 132,
    image: a("/places/stefan.jpg"), lat: 42.2566, lng: 18.8908,
  },
  {
    id: "budva", name: "Budva Old Town Loft", kicker: "Budva", city: "Budva", country: "Czarnogóra",
    description: "Loft w murach starego miasta. Morze za basztą, kawiarnie pod oknem.",
    longDescription: "Loft na drugim piętrze kamienicy w Starym Mieście.",
    eur: 95, unit: "noc", rating: 4.7, reviews: 88,
    image: a("/places/budva.jpg"), lat: 42.277, lng: 18.838,
  },
];

export const restaurants: Restaurant[] = [
  {
    id: "kalamper", name: "Kalamper Restaurant", kicker: "Dobra Voda", city: "Dobra Voda", country: "Czarnogóra",
    description: "Elegancki taras na dachu z panoramicznym widokiem na Adriatyk.",
    longDescription: "Kalamper serwuje rybę z porannego kutra.",
    eur: 45, unit: "osoba", image: a("/places/kalamper.jpg"), lat: 42.1469, lng: 19.0014,
    dishes: [
      { name: "Ośmiornica z rusztu", note: "oliwa, cytryna, chleb z pieca" },
      { name: "Crni rižot", note: "czarny risotto z mątwy" },
      { name: "Dorada", note: "cała ryba, zioła, ziemniaki" },
      { name: "Krewetki na buzarę", note: "czosnek, wino, perszun" },
      { name: "Tarta cytrynowa", note: "na taras, na zachód" },
    ],
  },
  {
    id: "konoba", name: "Konoba Stari Grad", kicker: "Kotor", city: "Kotor", country: "Czarnogóra",
    description: "Kamienna konoba w zaułku. Oliwa, crni rižot i wino.",
    longDescription: "Dwanaście stolików, kuchnia na widoku.",
    eur: 32, unit: "osoba", image: a("/places/konoba.jpg"), lat: 42.4248, lng: 18.7714,
    dishes: [
      { name: "Njeguški pršut", note: "deska, oliwki, ser" },
      { name: "Crni rižot", note: "porcja konoby" },
      { name: "Jagnięcina pod peka", note: "na zamówienie" },
      { name: "Shopska", note: "pomidor, ogórek, ser" },
      { name: "Vranac", note: "kieliszek z Crmnicy" },
    ],
  },
];

export const cars: RentalCar[] = [
  {
    id: "compact", name: "Compact", kicker: "Wynajem", city: "Podgorica", country: "Czarnogóra",
    description: "Miejski, ubezpieczony. Odbiór zwykle na TGD.",
    longDescription: "Pełne ubezpieczenie, drugi kierowca w cenie. Kontakt wyłącznie WhatsApp.",
    eur: 35, unit: "dzień", image: a("/places/car.jpg"), lat: 42.3594, lng: 19.2519,
    operator: { name: "Miloš Končević", company: "Adria Rent", whatsapp: "+38268111210" },
  },
  {
    id: "suv", name: "SUV", kicker: "Wynajem", city: "Podgorica", country: "Czarnogóra",
    description: "Na serpentyny do Lovćenu i na weekend w Durmitorze.",
    longDescription: "Automat, klimatyzacja, bagażnik. Odbiór TGD albo TIV.",
    eur: 65, unit: "dzień", image: a("/places/car.jpg"), lat: 42.3594, lng: 19.2519,
    operator: { name: "Miloš Končević", company: "Adria Rent", whatsapp: "+38268111210" },
  },
  {
    id: "cabrio", name: "Cabrio", kicker: "Wynajem", city: "Podgorica", country: "Czarnogóra",
    description: "Dach w dół na magistrali. Budva, Petrovac, Bar.",
    longDescription: "Odbiór na TGD. Kontakt z Milanem tylko na WhatsApp.",
    eur: 90, unit: "dzień", image: a("/places/car.jpg"), lat: 42.3594, lng: 19.2519,
    operator: { name: "Milan Petrović", company: "Coast Cabrio", whatsapp: "+38268111211" },
  },
];

export const properties: Property[] = [
  {
    id: "lustica", name: "Villa Lustica", kicker: "Sprzedaż", city: "Luštica", country: "Czarnogóra",
    description: "Willa z basenem i widokiem na otwarte morze. Akt notarialny po polsku.",
    longDescription: "Cztery sypialnie, basen infinity. Monte Lux prowadzi transakcję.",
    eur: 890000, unit: "obiekt", image: a("/places/villa.jpg"), lat: 42.391, lng: 18.662,
    caretaker: { name: "Marta Nowak", kind: "osoba", phone: "+382 68 111 201", label: "Opiekun oferty · Monte Lux" },
  },
  {
    id: "budva-rent", name: "Apartament Slovenska", kicker: "Wynajem", city: "Budva", country: "Czarnogóra",
    description: "Sezonowy wynajem przy Slovenskej plaży. Dwa pokoje, taras, parking.",
    longDescription: "Od czerwca do września albo na cały rok.",
    eur: 1800, unit: "miesiąc", image: a("/places/budva.jpg"), lat: 42.286, lng: 18.841,
    caretaker: { name: "Adriatic Keys", kind: "agencja", phone: "+382 68 111 202", label: "Agencja · Budva" },
  },
];

export type ShopItem = { id: string; name: string; description: string; eur: number; image: string };
export const shopItems: ShopItem[] = [
  { id: "oil", name: "Oliwa z Baru", description: "500 ml, pierwsze tłoczenie.", eur: 18, image: a("/places/konoba.jpg") },
  { id: "wine", name: "Vranac Crmnica", description: "Czerwone z południa.", eur: 22, image: a("/places/kalamper.jpg") },
  { id: "towel", name: "Ręcznik Monte Lux", description: "Lniany, duży.", eur: 29, image: a("/places/hero.jpg") },
];

export const tours: Place[] = [
  {
    id: "jeep", name: "Jeep w góry", kicker: "Durmitor / Lovćen", city: "Kotor", country: "Czarnogóra",
    description: "Serpentyny, widoki i przerwa na kajmak. Kierowca lokalny.",
    longDescription: "Wyjazd jeepem z Kotora albo Budvy.",
    eur: 45, unit: "osoba", image: a("/places/car.jpg"), lat: 42.4247, lng: 18.7712,
  },
  {
    id: "skadar", name: "Jezioro Szkoderskie", kicker: "Łódki", city: "Virpazar", country: "Czarnogóra",
    description: "Płytka woda, pelikany, wino w Virpazarze.",
    longDescription: "Łódka z Virpazaru. Spokojny rejs.",
    eur: 25, unit: "osoba", image: a("/places/hero.jpg"), lat: 42.2456, lng: 19.092,
  },
  {
    id: "zatoka", name: "Rejs Zatoką Kotorską", kicker: "Motorówka", city: "Kotor", country: "Czarnogóra",
    description: "Perast, Gospa od Škrpjela, ściana gór z wody.",
    longDescription: "Motorówka z portu w Kotorze.",
    eur: 35, unit: "osoba", image: a("/places/kotor.jpg"), lat: 42.4247, lng: 18.7712,
  },
];

export const services = [
  { slug: "hotele", title: "Hotele", hint: "Daty na karcie, 5 € opłaty, reszta na miejscu.", href: "/hotele", icon: "building" as const },
  { slug: "wycieczki", title: "Wycieczki", hint: "Jeep, Szkoderskie, rejs zatoką.", href: "/wycieczki", icon: "ship" as const },
  { slug: "samochody", title: "Wynajem auta", hint: "Od–do, godzina, odbiór TGD. WhatsApp.", href: "/samochody", icon: "car" as const },
  { slug: "nieruchomosci", title: "Agencje nieruchomości", hint: "Concierge: audyt, wizja, notariusz.", href: "/nieruchomosci", icon: "home" as const },
  { slug: "restauracje", title: "Restauracje", hint: "Polecamy — bez rezerwacji stolika.", href: "/restauracje", icon: "utensils" as const },
] as const;

export function getHotel(id: string) { return hotels.find((h) => h.id === id); }
export function getCar(id: string) { return cars.find((c) => c.id === id); }
export function getTour(id: string) { return tours.find((t) => t.id === id); }
export function getProperty(id: string) { return properties.find((p) => p.id === id); }
export function mapsUrl(lat: number, lng: number) { return `https://www.google.com/maps?q=${lat},${lng}`; }
export function whatsappUrl(phone: string) { return `https://wa.me/${phone.replace(/[^\d]/g, "")}`; }
