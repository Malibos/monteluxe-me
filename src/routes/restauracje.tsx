import { createFileRoute } from "@tanstack/react-router";
import { RestaurantCard } from "@/components/restaurant-card";
import { PageHeader } from "@/components/page-header";
import { restaurants } from "@/lib/data";

export const Route = createFileRoute("/restauracje")({
  component: RestaurantsPage,
});

function RestaurantsPage() {
  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Przewodnik"
        title="Restauracje"
        subtitle="Pięć dań, które biorą ludzie. Stolika nie rezerwujemy. Wynos z numerem — w modernizacji."
      />
      <div className="flex flex-col space-y-8 px-5">
        {restaurants.map((place, i) => (
          <RestaurantCard
            key={place.id}
            place={place}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  );
}
