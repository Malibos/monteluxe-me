import { FormEvent, useMemo, useState } from "react";
import { MapPin, Star } from "lucide-react";
import type { Place } from "@/lib/data";
import { PlaceActions } from "@/components/place-actions";
import { BOOKING_FEE_EUR, MAX_LISTING_PHOTOS } from "@/lib/fees";
import {
  cn,
  formatEur,
  formatPlnFromEur,
  isoDate,
  nightsBetween,
} from "@/lib/utils";

function photosOf(place: Place) {
  const list = [place.image, ...(place.photos ?? [])];
  return [...new Set(list)].slice(0, MAX_LISTING_PHOTOS);
}

export function HotelCard({
  hotel,
  onBook,
  bookLabel = "Zarezerwuj",
  showPrice = true,
  feeNote,
  withDates = false,
  onReserve,
}: {
  hotel: Place;
  onBook?: () => void;
  bookLabel?: string;
  showPrice?: boolean;
  feeNote?: string;
  withDates?: boolean;
  onReserve?: (input: {
    checkIn: string;
    checkOut: string;
    nights: number;
    stayEur: number;
  }) => void;
}) {
  const gallery = useMemo(() => photosOf(hotel), [hotel]);
  const [active, setActive] = useState(0);
  const [checkIn, setCheckIn] = useState(() => isoDate(7));
  const [checkOut, setCheckOut] = useState(() => isoDate(10));
  const shown = gallery[active] ?? hotel.image;
  const nights = nightsBetween(checkIn, checkOut);
  const stayEur = hotel.eur * nights;
  const fee = BOOKING_FEE_EUR.hotel;

  function submitDates(e: FormEvent) {
    e.preventDefault();
    onReserve?.({ checkIn, checkOut, nights, stayEur });
  }

  return (
    <article className="flex flex-col space-y-4">
      <img
        src={shown}
        alt={hotel.name}
        className="h-48 w-full shrink-0 rounded-[1.6rem] object-cover"
      />
      {gallery.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-14 w-14 shrink-0 overflow-hidden rounded-2xl border",
                i === active ? "border-cyan-400" : "border-white/20",
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
            {hotel.kicker}
          </p>
          <h2 className="font-display text-[1.65rem] leading-tight text-white">
            {hotel.name}
          </h2>
          <p className="flex items-center gap-1.5 text-sm text-gray-300">
            <MapPin className="size-3.5 shrink-0" />
            {hotel.city}, {hotel.country}
          </p>
          {hotel.rating ? (
            <p className="flex items-center gap-1 text-sm text-gray-300">
              <Star className="size-3.5 fill-cyan-400 text-cyan-400" />
              {hotel.rating.toFixed(1)} ({hotel.reviews} opinii)
            </p>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-gray-300">
          {hotel.description}
        </p>
        {showPrice ? (
          <div className="flex flex-col space-y-0.5">
            <p className="text-lg font-semibold text-white">
              od {formatEur(hotel.eur)} / {hotel.unit}
            </p>
            <p className="text-sm text-gray-300">{formatPlnFromEur(hotel.eur)}</p>
            {feeNote ? (
              <p className="text-sm text-cyan-300">{feeNote}</p>
            ) : null}
          </div>
        ) : null}
        <PlaceActions name={hotel.name} lat={hotel.lat} lng={hotel.lng} />
        {withDates && onReserve ? (
          <form
            onSubmit={submitDates}
            className="flex flex-col space-y-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg"
          >
            <label className="flex flex-col space-y-1.5">
              <span className="text-xs text-gray-300">Przyjazd</span>
              <input
                type="date"
                required
                value={checkIn}
                min={isoDate()}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-11 rounded-2xl border border-white/20 bg-black/30 px-3 text-sm text-white outline-none"
              />
            </label>
            <label className="flex flex-col space-y-1.5">
              <span className="text-xs text-gray-300">Wyjazd</span>
              <input
                type="date"
                required
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="h-11 rounded-2xl border border-white/20 bg-black/30 px-3 text-sm text-white outline-none"
              />
            </label>
            <p className="text-sm text-gray-300">
              {nights} {nights === 1 ? "noc" : "nocy"} · na miejscu{" "}
              {formatEur(stayEur)}
            </p>
            <p className="text-sm text-cyan-300">
              Teraz {formatEur(fee)} — do koszyka, potem PayU
            </p>
            <button
              type="submit"
              className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold"
            >
              {bookLabel}
            </button>
          </form>
        ) : onBook ? (
          <button
            type="button"
            onClick={onBook}
            className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold"
          >
            {bookLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}
