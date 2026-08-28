import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { HotelCard } from "@/components/hotel-card";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/lib/cart";
import { getHotel } from "@/lib/data";
import { BOOKING_FEE_EUR } from "@/lib/fees";
import { SITE } from "@/lib/site";
import { formatPlDate } from "@/lib/utils";

export const Route = createFileRoute("/hotele/$id")({
  component: HotelDetailPage,
  head: ({ params }) => {
    const hotel = getHotel(params.id);
    const title = hotel ? `${hotel.name} · Monte Lux` : "Monte Lux";
    const desc = hotel?.description ?? "";
    const image = hotel ? `${SITE.url}${hotel.image}` : `${SITE.url}/og.jpg`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: image },
        { property: "og:url", content: `${SITE.url}/hotele/${params.id}` },
      ],
    };
  },
});

function HotelDetailPage() {
  const { id } = Route.useParams();
  const hotel = getHotel(id);
  const navigate = useNavigate();
  const addItem = useCart((s) => s.addItem);

  if (!hotel) {
    return (
      <div className="px-5 py-8">
        <PageHeader title="Nie znaleziono" />
        <p className="text-sm text-gray-300">Ten obiekt nie jest w ofercie.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-6">
      <PageHeader kicker={hotel.kicker} title={hotel.name} subtitle={hotel.longDescription} backTo="/hotele" backLabel="Hotele" />
      <div className="flex flex-col space-y-5 px-5">
        <HotelCard
          hotel={hotel}
          withDates
          bookLabel="Do koszyka"
          onReserve={({ checkIn, checkOut, nights, stayEur }) => {
            addItem({
              kind: "hotel",
              listingId: hotel.id,
              title: hotel.name,
              subtitle: `${nights} ${nights === 1 ? "noc" : "nocy"} · ${formatPlDate(checkIn)} – ${formatPlDate(checkOut)}`,
              image: hotel.image,
              eur: stayEur,
              qty: 1,
              checkIn,
              checkOut,
              guests: 2,
              feeEur: BOOKING_FEE_EUR.hotel,
              restOnSiteEur: stayEur,
            });
            toast.success("Rezerwacja w koszyku");
            void navigate({ to: "/koszyk" });
          }}
        />
      </div>
    </div>
  );
}
