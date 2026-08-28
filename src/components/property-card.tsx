import { useState } from "react";
import { Check, UserRound } from "lucide-react";
import { HotelCard } from "@/components/hotel-card";
import type { Property } from "@/lib/data";
import { PROPERTY_SERVICES } from "@/lib/fees";
import { cn, formatEur } from "@/lib/utils";

type Service = (typeof PROPERTY_SERVICES)[number];

export function PropertyCard({
  place,
  onHire,
}: {
  place: Property;
  onHire: (services: Service[]) => void;
}) {
  const [picked, setPicked] = useState<string[]>(["legal"]);
  const selected = PROPERTY_SERVICES.filter((s) => picked.includes(s.id));
  const total = selected.reduce((n, s) => n + s.eur, 0);

  function toggle(id: string) {
    setPicked((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );
  }

  return (
    <article className="flex flex-col space-y-4">
      <HotelCard hotel={place} showPrice />
      <div className="flex flex-col space-y-4 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
        <div className="flex flex-col space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-300">
            Concierge
          </p>
          <p className="flex items-center gap-2 text-base text-white">
            <UserRound className="size-4 shrink-0" />
            {place.caretaker.name}
          </p>
          <p className="text-sm text-gray-300">{place.caretaker.label}</p>
        </div>
        <p className="text-sm leading-relaxed text-gray-300">
          Nie 3% od willi i nie ogłoszenie z Realitica. Legalizacja, wizja,
          przedwstępna, akt — tłumacz przysięgły osobno.
        </p>
        <ul className="flex flex-col space-y-2">
          {PROPERTY_SERVICES.map((service) => {
            const on = picked.includes(service.id);
            return (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => toggle(service.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left",
                    on
                      ? "border-cyan-400/80 bg-cyan-400/10"
                      : "border-white/20 bg-black/20",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border",
                      on
                        ? "border-cyan-400 bg-cyan-400 text-slate-950"
                        : "border-white/30 text-transparent",
                    )}
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col space-y-0.5">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-white">
                        {service.title}
                      </span>
                      <span className="shrink-0 text-sm text-white">
                        {formatEur(service.eur)}
                      </span>
                    </span>
                    <span className="text-xs leading-relaxed text-gray-300">
                      {service.hint}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          disabled={!selected.length}
          onClick={() => onHire(selected)}
          className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold disabled:opacity-40"
        >
          Zleć · {formatEur(total)}
        </button>
      </div>
    </article>
  );
}
