import { FormEvent, useMemo, useState } from "react";
import { PICKUP_POINTS, type RentalCar } from "@/lib/data";
import { BOOKING_FEE_EUR } from "@/lib/fees";
import {
  formatEur,
  formatPlnFromEur,
  isoDate,
  nightsBetween,
} from "@/lib/utils";

export function CarCard({
  car,
  onReserve,
}: {
  car: RentalCar;
  onReserve: (input: {
    from: string;
    to: string;
    time: string;
    pickupId: string;
    pickupLabel: string;
    days: number;
    stayEur: number;
  }) => void;
}) {
  const [from, setFrom] = useState(() => isoDate(1));
  const [to, setTo] = useState(() => isoDate(4));
  const [time, setTime] = useState("10:00");
  const [pickupId, setPickupId] = useState("tgd");
  const days = Math.max(1, nightsBetween(from, to));
  const stayEur = car.eur * days;
  const pickup = useMemo(
    () => PICKUP_POINTS.find((p) => p.id === pickupId) ?? PICKUP_POINTS[0],
    [pickupId],
  );
  const fee = BOOKING_FEE_EUR.car;

  function submit(e: FormEvent) {
    e.preventDefault();
    onReserve({
      from,
      to,
      time,
      pickupId: pickup.id,
      pickupLabel: pickup.label,
      days,
      stayEur,
    });
  }

  return (
    <article className="flex flex-col space-y-4">
      <img
        src={car.image}
        alt={car.name}
        className="h-48 w-full shrink-0 rounded-[1.6rem] object-cover"
      />
      <div className="flex flex-col space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
          {car.kicker}
        </p>
        <h2 className="font-display text-[1.65rem] leading-tight text-white">
          {car.name}
        </h2>
        <p className="text-sm text-gray-300">{car.description}</p>
        <p className="text-lg font-semibold text-white">
          od {formatEur(car.eur)} / dzień
        </p>
        <p className="text-sm text-gray-300">{formatPlnFromEur(car.eur)}</p>
      </div>
      <form
        onSubmit={submit}
        className="flex flex-col space-y-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg"
      >
        <label className="flex flex-col space-y-1.5">
          <span className="text-xs text-gray-300">Odbiór</span>
          <input type="date" required value={from} min={isoDate()} onChange={(e) => setFrom(e.target.value)} className="h-11 rounded-2xl border border-white/20 bg-black/30 px-3 text-sm text-white outline-none" />
        </label>
        <label className="flex flex-col space-y-1.5">
          <span className="text-xs text-gray-300">Zwrot</span>
          <input type="date" required value={to} min={from} onChange={(e) => setTo(e.target.value)} className="h-11 rounded-2xl border border-white/20 bg-black/30 px-3 text-sm text-white outline-none" />
        </label>
        <label className="flex flex-col space-y-1.5">
          <span className="text-xs text-gray-300">Godzina odbioru (przylot)</span>
          <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="h-11 rounded-2xl border border-white/20 bg-black/30 px-3 text-sm text-white outline-none" />
        </label>
        <label className="flex flex-col space-y-1.5">
          <span className="text-xs text-gray-300">Skąd</span>
          <select value={pickupId} onChange={(e) => setPickupId(e.target.value)} className="h-11 rounded-2xl border border-white/20 bg-black/30 px-3 text-sm text-white outline-none">
            {PICKUP_POINTS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </label>
        <p className="text-sm text-gray-300">
          {days} {days === 1 ? "dzień" : "dni"} · u wypożyczalni {formatEur(stayEur)}
        </p>
        <p className="text-sm text-cyan-300">
          Teraz {formatEur(fee)} · WhatsApp po opłacie, bez udostępniania mapy
        </p>
        <button type="submit" className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold">
          Do koszyka
        </button>
      </form>
    </article>
  );
}
