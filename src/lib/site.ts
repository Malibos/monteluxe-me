export const SITE = {
  name: "Monte Lux",
  domain: "monteluxe.me",
  url: "https://monteluxe.me",
  email: "hello@monteluxe.me",
  country: "Czarnogóra",
} as const;

export function sitePath(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

/** Gotowiec na grupę / forum FB — wklejasz 1:1. */
export const FACEBOOK_POST = `Monte Lux — Czarnogóra z telefonu.

Noclegi, wycieczki, wynajem auta (odbiór zwykle Podgorica TGD) i concierge przy nieruchomościach: legalizacja, wizja, umowa przedwstępna, akt. Tłumacz przysięgły osobno.

Nie OLX i nie 3% od willi. Mała opłata rezerwacyjna, reszta u gospodarza.

https://monteluxe.me

Na iPhonie: Safari → Udostępnij → Do ekranu początkowego.`;
