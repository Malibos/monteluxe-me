import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EUR_PLN } from "@/lib/data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEur(value: number) {
  return `${value.toLocaleString("pl-PL")} €`;
}

export function formatPlnFromEur(eur: number) {
  const pln = eur * EUR_PLN;
  return `ok. ${pln.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;
}

export function isoDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function nightsBetween(from: string, to: string) {
  const a = new Date(`${from}T12:00:00`);
  const b = new Date(`${to}T12:00:00`);
  const diff = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  return Math.max(1, diff);
}

export function formatPlDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function sharePlace(title: string, url: string) {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
      return "shared";
    }
  } catch {
    return "cancelled";
  }
  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "failed";
  }
}
