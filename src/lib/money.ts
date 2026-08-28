import { EUR_PLN } from "@/lib/data";

export function eurToPln(eur: number) {
  return Math.round(eur * EUR_PLN * 100) / 100;
}

export function plnToGrosze(pln: number) {
  return Math.round(pln * 100);
}

export function groszeToPlnLabel(grosze: number) {
  const pln = grosze / 100;
  return `${pln.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;
}

export function feeGrosze(feeEur: number) {
  return plnToGrosze(eurToPln(feeEur));
}
