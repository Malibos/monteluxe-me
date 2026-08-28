import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { completeDemoPayment, getBooking } from "@/lib/booking-fn";
import { groszeToPlnLabel } from "@/lib/money";

export const Route = createFileRoute("/payu-demo")({
  validateSearch: (s: Record<string, unknown>) => ({
    booking: String(s.booking ?? ""),
  }),
  component: PayuDemoPage,
});

function PayuDemoPage() {
  const { booking: id } = Route.useSearch();
  const navigate = useNavigate();
  const [label, setLabel] = useState("…");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    void getBooking({ data: { id } })
      .then((b) => setLabel(groszeToPlnLabel(b.feePlnGrosze)))
      .catch(() => setLabel("—"));
  }, [id]);

  async function finish(ok: boolean) {
    if (!id) return;
    setBusy(true);
    await completeDemoPayment({ data: { id, ok } });
    await navigate({ to: "/rezerwacja/$id", params: { id } });
  }

  return (
    <div className="flex flex-col px-5 pb-8 pt-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
        PayU · tryb testowy
      </p>
      <h1 className="mt-2 font-display text-3xl text-white">Płatność</h1>
      <p className="mt-2 text-sm leading-relaxed text-gray-300">
        Umowy PayU jeszcze nie ma — to ta sama ścieżka co bramka. Po kluczach
        tu wejdzie prawdziwy PayU (BLIK / Apple Pay / Google Pay).
      </p>
      <div className="mt-6 flex flex-col space-y-2 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
        <p className="text-sm text-gray-300">Do zapłaty</p>
        <p className="text-3xl font-semibold text-white">{label}</p>
        <p className="text-sm text-gray-300">Monte Lux · monteluxe.me</p>
      </div>
      <button
        type="button"
        disabled={busy || !id}
        onClick={() => void finish(true)}
        className="btn-cyan mt-6 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold"
      >
        Zapłać (test)
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => void finish(false)}
        className="mt-3 flex h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm text-white"
      >
        Anuluj
      </button>
    </div>
  );
}
