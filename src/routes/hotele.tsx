import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { HotelCard } from "@/components/hotel-card";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/lib/cart";
import { hotels } from "@/lib/data";
import { BOOKING_FEE_EUR } from "@/lib/fees";
import { formatPlDate } from "@/lib/utils";

export const Route = createFileRoute("/hotele")({ component: HotelsPage });

function HotelsPage() {
  const navigate = useNavigate();
  const addItem = useCart((s) => s.addItem);

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Noclegi"
        title="Hotele i apartamenty"
        subtitle="Wybierz daty na karcie i wrzuć rezerwację do koszyka."
      />
      <div className="flex flex-col space-y-8 px-5">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
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
        ))}
      </div>
    </div>
  );
}
