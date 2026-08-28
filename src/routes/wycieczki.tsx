import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { HotelCard } from "@/components/hotel-card";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/lib/cart";
import { tours } from "@/lib/data";
import { BOOKING_FEE_EUR } from "@/lib/fees";
import { formatEur } from "@/lib/utils";

export const Route = createFileRoute("/wycieczki")({ component: ToursPage });

function ToursPage() {
  const addItem = useCart((s) => s.addItem);
  const navigate = useNavigate();
  const fee = BOOKING_FEE_EUR.tourPerPerson;

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Teren"
        title="Wycieczki"
        subtitle="Jeep, Szkoderskie, motorówka. 2,50 € od osoby teraz — reszta u kapitana."
      />
      <div className="flex flex-col space-y-8 px-5">
        {tours.map((tour) => (
          <HotelCard
            key={tour.id}
            hotel={tour}
            bookLabel="Zarezerwuj"
            feeNote={`Teraz ${formatEur(fee)} / osoba · reszta na miejscu`}
            onBook={() => {
              addItem({
                listingId: tour.id,
                kind: "tour",
                title: tour.name,
                subtitle: `2 os. · opłata ${formatEur(fee * 2)}`,
                image: tour.image,
                eur: tour.eur * 2,
                qty: 1,
                guests: 2,
                feeEur: fee * 2,
                restOnSiteEur: tour.eur * 2,
              });
              toast.success("Wycieczka w koszyku");
              void navigate({ to: "/koszyk" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
