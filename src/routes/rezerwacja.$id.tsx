import { createFileRoute, Link } from "@tanstack/react-router";
import { getBooking } from "@/lib/booking-fn";
import { PageHeader } from "@/components/page-header";
import { getCar, getProperty, whatsappUrl } from "@/lib/data";
import { groszeToPlnLabel } from "@/lib/money";
import { formatEur } from "@/lib/utils";

export const Route = createFileRoute("/rezerwacja/$id")({
  loader: ({ params }) => getBooking({ data: { id: params.id } }),
  component: BookingStatusPage,
});

const labels: Record<string, string> = {
  pending_payment: "Czeka na PayU",
  awaiting_host: "Opłacona — czeka na gospodarza",
  confirmed: "Opłacona",
  cancelled: "Anulowana / zwrot",
  completed: "Zakończona",
};

function BookingStatusPage() {
  const booking = Route.useLoaderData();
  const paid =
    booking.status === "awaiting_host" ||
    booking.status === "confirmed" ||
    booking.status === "completed";
  const property =
    booking.kind === "property" ? getProperty(booking.listingId) : undefined;
  const car = booking.kind === "car" ? getCar(booking.listingId) : undefined;

  return (
    <div className="flex flex-col pb-6">
      <PageHeader kicker="Voucher" title={booking.title} subtitle={labels[booking.status] ?? booking.status} />
      <div className="mx-5 flex flex-col space-y-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg text-sm text-gray-300">
        <p className="text-white">{booking.guestName}</p>
        <p>{booking.guestEmail}</p>
        <p>{booking.guestPhone}</p>
        {booking.checkIn ? (
          <p>
            {booking.checkIn}
            {booking.pickupTime ? ` ${booking.pickupTime}` : ""}
            {booking.checkOut ? ` → ${booking.checkOut}` : ""}
          </p>
        ) : null}
        {booking.pickupPlace ? <p>{booking.pickupPlace}</p> : null}
        <p>Opłata: {groszeToPlnLabel(booking.feePlnGrosze)}</p>
        {booking.restOnSiteEur > 0 ? <p>Na miejscu: {formatEur(booking.restOnSiteEur)}</p> : null}
        {paid && car ? (
          <div className="flex flex-col space-y-1 border-t border-white/20 pt-3">
            <p className="text-white">{car.operator.company}</p>
            <p>{car.operator.name}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Tylko WhatsApp</p>
            <a href={whatsappUrl(car.operator.whatsapp)} target="_blank" rel="noreferrer" className="text-base text-cyan-300">
              {car.operator.whatsapp}
            </a>
          </div>
        ) : null}
        {paid && property ? (
          <div className="flex flex-col space-y-1 border-t border-white/20 pt-3">
            <p className="text-white">{property.caretaker.name}</p>
            <p>{property.caretaker.label}</p>
            <a href={`tel:${property.caretaker.phone.replace(/\s/g, "")}`} className="text-base text-cyan-300">
              {property.caretaker.phone}
            </a>
          </div>
        ) : null}
        <p className="text-xs">nr {booking.id}</p>
      </div>
      <Link to="/panel" className="mx-5 mt-5 text-center text-sm text-cyan-300">Panel gospodarza</Link>
    </div>
  );
}
