import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { PropertyCard } from "@/components/property-card";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/lib/cart";
import { properties } from "@/lib/data";

export const Route = createFileRoute("/nieruchomosci")({
  component: PropertiesPage,
});

function PropertiesPage() {
  const addItem = useCart((s) => s.addItem);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Concierge"
        title="Nieruchomości"
        subtitle="Legalizacja, wizja, przedwstępna, akt. Tłumacz przysięgły — osobna pozycja."
      />
      <div className="flex flex-col space-y-8 px-5">
        {properties.map((item) => (
          <PropertyCard
            key={item.id}
            place={item}
            onHire={(services) => {
              for (const service of services) {
                addItem({
                  listingId: item.id,
                  kind: "property",
                  title: `${service.title} · ${item.name}`,
                  subtitle: `${item.caretaker.name} · ${item.city}`,
                  image: item.image,
                  eur: service.eur,
                  qty: 1,
                  feeEur: service.eur,
                });
              }
              toast.success("Zlecenie w koszyku");
              void navigate({ to: "/koszyk" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
