import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { CarCard } from "@/components/car-card";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/lib/cart";
import { cars } from "@/lib/data";
import { BOOKING_FEE_EUR } from "@/lib/fees";
import { formatPlDate } from "@/lib/utils";

export const Route = createFileRoute("/samochody")({ component: CarsPage });

function CarsPage() {
  const addItem = useCart((s) => s.addItem);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Wynajem"
        title="Samochody"
        subtitle="Od–do, godzina przylotu, zwykle TGD. W voucherze WhatsApp do Miłosza albo Milana — bez mapy."
      />
      <div className="flex flex-col space-y-8 px-5">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onReserve={({ from, to, time, pickupLabel, days, stayEur }) => {
              addItem({
                listingId: car.id,
                kind: "car",
                title: car.name,
                subtitle: `${formatPlDate(from)} ${time} → ${formatPlDate(to)} · ${pickupLabel}`,
                image: car.image,
                eur: stayEur,
                qty: 1,
                checkIn: from,
                checkOut: to,
                pickupTime: time,
                pickupPlace: pickupLabel,
                guests: days,
                feeEur: BOOKING_FEE_EUR.car,
                restOnSiteEur: stayEur,
              });
              toast.success("Auto w koszyku");
              void navigate({ to: "/koszyk" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
