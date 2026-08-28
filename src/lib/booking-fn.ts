import { createServerFn } from "@tanstack/react-start";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";
import { feeGrosze } from "@/lib/money";

export type StaffRole = "superadmin" | "host";
export type Staff = {
  id: string;
  email: string;
  role: StaffRole;
  listingIds: string[];
  name: string;
};
export type Booking = {
  id: string;
  listingId: string;
  kind: string;
  title: string;
  image: string | null;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string | null;
  checkOut: string | null;
  pickupPlace: string | null;
  pickupTime: string | null;
  guests: number;
  feePlnGrosze: number;
  restOnSiteEur: number;
  status: string;
  payuOrderId: string | null;
  hostNote: string | null;
  createdAt: string;
  paidAt: string | null;
  confirmedAt: string | null;
};

type CartPayload = {
  listingId: string;
  kind: string;
  title: string;
  image: string;
  checkIn?: string;
  checkOut?: string;
  pickupPlace?: string;
  pickupTime?: string;
  guests?: number;
  feeEur: number;
  feeGrosze?: number;
  restOnSiteEur: number;
};

const DEMO_PASS = "MonteLux1!";

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}
function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  if (next.length !== prev.length) return false;
  return timingSafeEqual(next, prev);
}
function mapBooking(row: Record<string, unknown>): Booking {
  return {
    id: String(row.id),
    listingId: String(row.listing_id),
    kind: String(row.kind),
    title: String(row.title),
    image: row.image ? String(row.image) : null,
    guestName: String(row.guest_name),
    guestEmail: String(row.guest_email),
    guestPhone: String(row.guest_phone),
    checkIn: row.check_in ? String(row.check_in) : null,
    checkOut: row.check_out ? String(row.check_out) : null,
    pickupPlace: row.pickup_place ? String(row.pickup_place) : null,
    pickupTime: row.pickup_time ? String(row.pickup_time) : null,
    guests: Number(row.guests),
    feePlnGrosze: Number(row.fee_pln_grosze),
    restOnSiteEur: Number(row.rest_on_site_eur),
    status: String(row.status),
    payuOrderId: row.payu_order_id ? String(row.payu_order_id) : null,
    hostNote: row.host_note ? String(row.host_note) : null,
    createdAt: String(row.created_at),
    paidAt: row.paid_at ? String(row.paid_at) : null,
    confirmedAt: row.confirmed_at ? String(row.confirmed_at) : null,
  };
}
async function ensureStaff() {
  const sql = await getSql();
  const existing = await sql.query<{ id: string }>("select id from staff limit 1");
  if (existing.length) return;
  const hash = hashPassword(DEMO_PASS);
  await sql.query(
    `insert into staff (id, email, password_hash, role, listing_ids, name) values
     ($1,$2,$3,'superadmin','','Arkadiusz'),
     ($4,$5,$6,'host','kotor-bay,perast,compact,jeep','Host Kotor')`,
    ["staff-admin", "admin@monteluxe.me", hash, "staff-host", "host@monteluxe.me", hash],
  );
}
async function staffFromToken(token: string | null): Promise<Staff | null> {
  if (!token) return null;
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(
    `select s.id, s.email, s.role, s.listing_ids, s.name from staff_sessions sess join staff s on s.id = sess.staff_id where sess.token = $1 and sess.expires_at > now()`,
    [token],
  );
  const row = rows[0];
  if (!row) return null;
  return {
    id: String(row.id),
    email: String(row.email),
    role: String(row.role) as StaffRole,
    listingIds: String(row.listing_ids || "").split(",").map((s) => s.trim()).filter(Boolean),
    name: String(row.name),
  };
}
function payuReady() {
  return Boolean(process.env.PAYU_POS_ID?.trim() && process.env.PAYU_CLIENT_ID?.trim() && process.env.PAYU_CLIENT_SECRET?.trim());
}
async function payuToken() {
  const base = process.env.PAYU_SANDBOX === "false" ? "https://secure.payu.com" : "https://secure.snd.payu.com";
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.PAYU_CLIENT_ID!,
    client_secret: process.env.PAYU_CLIENT_SECRET!,
  });
  const res = await fetch(`${base}/pl/standard/user/oauth/authorize`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error("PayU token");
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("PayU token empty");
  return { token: json.access_token, base };
}
async function createPayuRedirect(opts: { bookingId: string; amountGrosze: number; description: string; email: string; origin: string; }) {
  if (!payuReady()) {
    return `${opts.origin}/payu-demo?booking=${encodeURIComponent(opts.bookingId)}`;
  }
  const { token, base } = await payuToken();
  const res = await fetch(`${base}/api/v2_1/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    redirect: "manual",
    body: JSON.stringify({
      notifyUrl: `${opts.origin}/api/payu/notify`,
      continueUrl: `${opts.origin}/rezerwacja/${opts.bookingId}`,
      customerIp: "127.0.0.1",
      merchantPosId: process.env.PAYU_POS_ID,
      description: opts.description,
      currencyCode: "PLN",
      totalAmount: String(opts.amountGrosze),
      extOrderId: opts.bookingId,
      buyer: { email: opts.email, language: "pl" },
      products: [{ name: opts.description.slice(0, 127), unitPrice: String(opts.amountGrosze), quantity: "1" }],
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { redirectUri?: string; orderId?: string };
  if (!json.redirectUri) throw new Error("PayU nie zwróciło adresu bramki");
  const sql = await getSql();
  await sql.query("update bookings set payu_order_id = $1 where id = $2", [json.orderId ?? null, opts.bookingId]);
  return json.redirectUri;
}

export const staffLogin = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const v = d as { email?: string; password?: string };
    if (!v.email || !v.password) throw new Error("Podaj e-mail i hasło");
    return { email: v.email.trim().toLowerCase(), password: v.password };
  })
  .handler(async ({ data }) => {
    await ensureStaff();
    const sql = await getSql();
    const rows = await sql.query<Record<string, unknown>>("select * from staff where email = $1", [data.email]);
    const row = rows[0];
    if (!row || !verifyPassword(data.password, String(row.password_hash))) throw new Error("Błędny e-mail lub hasło");
    const token = randomBytes(24).toString("hex");
    await sql.query("insert into staff_sessions (token, staff_id, expires_at) values ($1,$2, now() + interval '14 days')", [token, String(row.id)]);
    return { token, role: String(row.role), name: String(row.name) };
  });

export const staffLogout = createServerFn({ method: "POST" }).handler(async () => ({ ok: true }));

export const getStaffSession = createServerFn({ method: "GET" }).handler(async () => {
  await ensureStaff();
  return { staff: null as Staff | null, payuLive: payuReady() };
});

export const listBookings = createServerFn({ method: "POST" })
  .validator((d: unknown) => ({ token: (d as { token?: string })?.token ?? "" }))
  .handler(async ({ data }) => {
    await ensureStaff();
    const staff = await staffFromToken(data.token);
    if (!staff) throw new Error("Sesja wygasła");
    const sql = await getSql();
    const rows =
      staff.role === "superadmin"
        ? await sql.query<Record<string, unknown>>("select * from bookings order by created_at desc limit 80")
        : await sql.query<Record<string, unknown>>(`select * from bookings where listing_id = any($1::text[]) order by created_at desc limit 80`, [staff.listingIds.length ? staff.listingIds : ["__none__"]]);
    return { staff, bookings: rows.map(mapBooking), payuLive: payuReady() };
  });

export const createCheckout = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const v = d as { guestName?: string; guestEmail?: string; guestPhone?: string; origin?: string; items?: CartPayload[] };
    if (!v.guestName?.trim() || !v.guestEmail?.trim() || !v.guestPhone?.trim()) throw new Error("Imię, e-mail i telefon są wymagane");
    if (!v.items?.length) throw new Error("Koszyk pusty");
    return {
      guestName: v.guestName.trim(),
      guestEmail: v.guestEmail.trim(),
      guestPhone: v.guestPhone.trim(),
      origin: (v.origin || "https://monteluxe.me").replace(/\/$/, ""),
      items: v.items,
    };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const item = data.items[0];
    const grosze = data.items.reduce((n, i) => n + (i.feeGrosze ?? feeGrosze(i.feeEur)), 0);
    const id = `bk-${randomBytes(5).toString("hex")}`;
    await sql.query(
      `insert into bookings (id, listing_id, kind, title, image, guest_name, guest_email, guest_phone, check_in, check_out, guests, fee_pln_grosze, rest_on_site_eur, status, pickup_place, pickup_time) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'pending_payment',$14,$15)`,
      [id, item.listingId, item.kind, data.items.map((i) => i.title).join(", "), item.image, data.guestName, data.guestEmail, data.guestPhone, item.checkIn ?? null, item.checkOut ?? null, item.guests ?? 1, grosze, data.items.reduce((n, i) => n + (i.restOnSiteEur || 0), 0), item.pickupPlace ?? null, item.pickupTime ?? null],
    );
    const url = await createPayuRedirect({ bookingId: id, amountGrosze: grosze, description: `Monte Lux — ${item.title}`, email: data.guestEmail, origin: data.origin });
    return { bookingId: id, url, grosze };
  });

export const getBooking = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const v = d as { id?: string };
    if (!v.id) throw new Error("Brak rezerwacji");
    return { id: v.id };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql.query<Record<string, unknown>>("select * from bookings where id = $1", [data.id]);
    if (!rows[0]) throw new Error("Nie znaleziono");
    return mapBooking(rows[0]);
  });

export const completeDemoPayment = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const v = d as { id?: string; ok?: boolean };
    if (!v.id) throw new Error("Brak rezerwacji");
    return { id: v.id, ok: Boolean(v.ok) };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    if (!data.ok) {
      await sql.query("update bookings set status = 'cancelled' where id = $1 and status = 'pending_payment'", [data.id]);
      return { status: "cancelled" };
    }
    const rows = await sql.query<{ kind: string }>("select kind from bookings where id = $1", [data.id]);
    const next = rows[0]?.kind === "property" ? "confirmed" : "awaiting_host";
    await sql.query("update bookings set status = $2, paid_at = now(), confirmed_at = case when $2 = 'confirmed' then now() else confirmed_at end where id = $1 and status = 'pending_payment'", [data.id, next]);
    return { status: next };
  });

export const decideBooking = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const v = d as { token?: string; id?: string; accept?: boolean };
    if (!v.token || !v.id) throw new Error("Brak danych");
    return { token: v.token, id: v.id, accept: Boolean(v.accept) };
  })
  .handler(async ({ data }) => {
    const staff = await staffFromToken(data.token);
    if (!staff) throw new Error("Sesja wygasła");
    const sql = await getSql();
    const rows = await sql.query<Record<string, unknown>>("select * from bookings where id = $1", [data.id]);
    const row = rows[0];
    if (!row) throw new Error("Brak rezerwacji");
    if (staff.role !== "superadmin" && !staff.listingIds.includes(String(row.listing_id))) throw new Error("Brak dostępu");
    if (data.accept) {
      await sql.query("update bookings set status = 'confirmed', confirmed_at = now() where id = $1", [data.id]);
      return { status: "confirmed" };
    }
    await sql.query("update bookings set status = 'cancelled' where id = $1", [data.id]);
    return { status: "cancelled" };
  });
