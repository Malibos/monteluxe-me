import { useState } from "react";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import type { Restaurant } from "@/lib/data";
import { PlaceActions } from "@/components/place-actions";
import { cn } from "@/lib/utils";

export function RestaurantCard({
  place,
  defaultOpen = false,
}: {
  place: Restaurant;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className="flex flex-col space-y-4">
      <img
        src={place.image}
        alt={place.name}
        className="h-48 w-full shrink-0 rounded-[1.6rem] object-cover"
      />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-start justify-between gap-3 text-left"
      >
        <div className="flex min-w-0 flex-col space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
            {place.kicker}
          </p>
          <h2 className="font-display text-[1.65rem] leading-tight text-white">
            {place.name}
          </h2>
          <p className="flex items-center gap-1.5 text-sm text-gray-300">
            <MapPin className="size-3.5 shrink-0" />
            {place.city}, {place.country}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "mt-2 size-5 shrink-0 text-gray-300 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <p className="text-sm leading-relaxed text-gray-300">{place.description}</p>
      {open ? (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-300">
              Top 5
            </p>
            <ol className="flex flex-col space-y-3">
              {place.dishes.map((dish, i) => (
                <li key={dish.name} className="flex flex-col space-y-0.5">
                  <span className="text-sm font-medium text-white">
                    {i + 1}. {dish.name}
                  </span>
                  <span className="text-sm text-gray-300">{dish.note}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 text-sm text-gray-300 backdrop-blur-lg">
            <Phone className="size-4" />
            Numer od lokalu — wkrótce
          </p>
          <PlaceActions name={place.name} lat={place.lat} lng={place.lng} />
        </div>
      ) : (
        <p className="text-sm text-gray-300">Rozwiń — 5 dań, które biorą ludzie.</p>
      )}
    </article>
  );
}
