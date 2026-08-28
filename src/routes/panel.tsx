import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import {
  decideBooking,
  listBookings,
  staffLogin,
  type Booking,
  type Staff,
} from "@/lib/booking-fn";
import { groszeToPlnLabel } from "@/lib/money";
import { getStaffToken, setStaffToken } from "@/lib/staff-session";

export const Route = createFileRoute("/panel")({ component: PanelPage });

const statusPl: Record<string, string> = {
  pending_payment: "PayU",
  awaiting_host: "Do przyjęcia",
  confirmed: "Przyjęta",
  cancelled: "Anulowana",
  completed: "Po pobycie",
};

function PanelPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [staff, setStaff] = useState<Staff | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payuLive, setPayuLive] = useState(false);
  const [email, setEmail] = useState("admin@monteluxe.me");
  const [password, setPassword] = useState("MonteLux1!");
  const [busy, setBusy] = useState(false);

  async function load(t: string) {
    const data = await listBookings({ data: { token: t } });
    setStaff(data.staff);
    setBookings(data.bookings);
    setPayuLive(data.payuLive);
  }

  useEffect(() => {
    const t = getStaffToken();
    if (!t) return;
    setToken(t);
    void load(t).catch(() => setStaffToken(null));
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await staffLogin({ data: { email, password } });
      setStaffToken(res.token);
      setToken(res.token);
      await load(res.token);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Logowanie nieudane");
    } finally {
      setBusy(false);
    }
  }

  async function decide(id: string, accept: boolean) {
    try {
      await decideBooking({ data: { token, id, accept } });
      await load(token);
      toast.success(accept ? "Przyjęto — daty zablokowane" : "Odrzucono");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Błąd");
    }
  }

  if (!staff) {
    return (
      <div className="flex flex-col pb-6">
        <PageHeader kicker="Panel" title="Zarządzanie" subtitle="SuperAdmin i Host. Gość płaci PayU, tutaj przyjmujesz voucher." />
        <form onSubmit={login} className="mx-5 flex flex-col space-y-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none" />
          <button type="submit" disabled={busy} className="btn-cyan flex h-12 items-center justify-center rounded-full text-sm font-semibold">Wejdź</button>
          <p className="text-xs leading-relaxed text-gray-300">admin@monteluxe.me albo host@monteluxe.me · hasło MonteLux1!</p>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-6">
      <PageHeader kicker={staff.role === "superadmin" ? "SuperAdmin" : "Host"} title={staff.name} subtitle={payuLive ? "PayU live" : "PayU testowe — po umowie wejdzie BLIK i Apple Pay"} />
      <div className="flex flex-col space-y-4 px-5">
        {bookings.length === 0 ? (
          <p className="text-sm text-gray-300">Brak rezerwacji. Z telefonu: Hotele → daty → koszyk → PayU.</p>
        ) : (
          bookings.map((b) => (
            <article key={b.id} className="flex flex-col space-y-2 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-300">{statusPl[b.status] ?? b.status}</p>
              <h2 className="font-display text-xl text-white">{b.title}</h2>
              <p className="text-sm text-gray-300">{b.guestName} · {b.guestPhone}</p>
              {b.checkIn ? <p className="text-sm text-gray-300">{b.checkIn}{b.checkOut ? ` → ${b.checkOut}` : ""}</p> : null}
              <p className="text-sm text-white">{groszeToPlnLabel(b.feePlnGrosze)}</p>
              {b.status === "awaiting_host" ? (
                <div className="flex flex-col space-y-2 pt-1">
                  <button type="button" onClick={() => void decide(b.id, true)} className="btn-cyan flex h-11 items-center justify-center rounded-full text-sm font-semibold">Przyjmuję</button>
                  <button type="button" onClick={() => void decide(b.id, false)} className="flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm text-white">Odrzucam (zwrot)</button>
                </div>
              ) : (
                <Link to="/rezerwacja/$id" params={{ id: b.id }} className="text-sm text-cyan-300">Voucher</Link>
              )}
            </article>
          ))
        )}
        <button type="button" onClick={() => { setStaffToken(null); setStaff(null); void navigate({ to: "/panel" }); }} className="h-11 rounded-full border border-white/20 text-sm text-gray-300">Wyloguj</button>
      </div>
    </div>
  );
}
