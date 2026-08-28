import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { createCheckout } from "@/lib/booking-fn";
import { kindLabel, payableFeeEur, payableGrosze, useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";
import { formatEur } from "@/lib/utils";
import { groszeToPlnLabel } from "@/lib/money";

export const Route = createFileRoute("/koszyk")({ component: CartPage });

function CartPage() {
  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);
  const guestName = useCart((s) => s.guestName);
  const setGuestName = useCart((s) => s.setGuestName);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accept, setAccept] = useState(false);
  const [busy, setBusy] = useState(false);

  const rest = items.reduce((n, i) => n + (i.restOnSiteEur ?? 0), 0);
  const feeGrosze = items.reduce((n, i) => n + payableGrosze(i), 0);

  async function pay(e: FormEvent) {
    e.preventDefault();
    if (!accept) {
      toast.error("Zaakceptuj opłatę i voucher");
      return;
    }
    const bookable = items.filter((i) => payableGrosze(i) > 0);
    if (!bookable.length) {
      toast.error("Dodaj nocleg, auto, wycieczkę albo kontakt do oferty");
      return;
    }
    setBusy(true);
    try {
      const result = await createCheckout({
        data: {
          guestName,
          guestEmail: email,
          guestPhone: phone,
          origin: window.location.origin,
          items: bookable.map((i) => ({
            listingId: i.listingId || i.id,
            kind: i.kind,
            title: i.title,
            image: i.image,
            checkIn: i.checkIn,
            checkOut: i.checkOut,
            pickupPlace: i.pickupPlace,
            pickupTime: i.pickupTime,
            guests: i.guests,
            feeEur: payableFeeEur(i) * i.qty,
            feeGrosze: payableGrosze(i),
            restOnSiteEur: i.restOnSiteEur ?? 0,
          })),
        },
      });
      clear();
      window.location.href = result.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "PayU niedostępne");
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Koszyk"
        title="Do zapłaty"
        subtitle="PayU: opłata rezerwacyjna albo zlecenie concierge. Reszta noclegu — u gospodarza."
      />
      <div className="flex flex-col space-y-5 px-5">
        {items.length === 0 ? (
          <div className="flex flex-col space-y-4 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg">
            <p className="font-display text-2xl text-white">Pusto</p>
            <p className="text-sm leading-relaxed text-gray-300">
              Hotel z datami, auto, wycieczka albo zlecenie concierge przy willi.
            </p>
            <Link to="/hotele" className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold">
              Zobacz hotele
            </Link>
          </div>
        ) : (
          <form onSubmit={pay} className="flex flex-col space-y-5">
            {items.map((item) => (
              <article key={item.id} className="flex flex-col space-y-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-300">{kindLabel[item.kind]}</p>
                <h2 className="font-display text-xl text-white">{item.title}</h2>
                <p className="text-sm text-gray-300">{item.subtitle}</p>
                {item.kind === "property" ? (
                  <p className="text-lg font-semibold text-white">{formatEur(item.feeEur ?? item.eur)}</p>
                ) : item.feeEur ? (
                  <>
                    <p className="text-lg font-semibold text-white">Teraz {formatEur(item.feeEur)}</p>
                    {(item.restOnSiteEur ?? 0) > 0 ? (
                      <p className="text-sm text-gray-300">Na miejscu {formatEur(item.restOnSiteEur ?? 0)}</p>
                    ) : null}
                  </>
                ) : (
                  <p className="text-lg font-semibold text-white">{formatEur(item.eur * item.qty)}</p>
                )}
                <button type="button" onClick={() => removeItem(item.id)} className="flex h-11 w-full items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm text-white">
                  Usuń
                </button>
              </article>
            ))}
            <div className="flex flex-col space-y-2 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
              <p className="text-sm text-gray-300">Opłata teraz (PayU)</p>
              <p className="text-2xl font-semibold text-white">{groszeToPlnLabel(feeGrosze)}</p>
              {rest > 0 ? <p className="text-sm text-gray-300">U gospodarza: {formatEur(rest)}</p> : null}
            </div>
            <input required value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Imię i nazwisko" className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-gray-300" />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail na voucher" className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-gray-300" />
            <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-gray-300" />
            <label className="flex items-start gap-3 text-sm text-gray-300">
              <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} className="mt-1 size-4 accent-cyan-400" />
              Akceptuję płatność Monte Lux (PayU). Przy noclegu: voucher do gospodarza, cisza = zwrot. Przy willi: start zlecenia.
            </label>
            <button type="submit" disabled={busy || feeGrosze <= 0} className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold disabled:opacity-40">
              {busy ? "PayU…" : "Zapłać przez PayU"}
            </button>
            <p className="text-center text-xs text-gray-300">
              BLIK, Apple Pay, Google Pay — po umowie PayU. Dziś bramka testowa. {SITE.email}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
