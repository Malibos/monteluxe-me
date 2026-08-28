import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/lib/cart";
import { shopItems } from "@/lib/data";
import { formatEur, formatPlnFromEur } from "@/lib/utils";

export const Route = createFileRoute("/sklep")({ component: ShopPage });

function ShopPage() {
  const addItem = useCart((s) => s.addItem);

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Sklep"
        title="Lokalne smaki"
        subtitle="Oliwa, wino, ręcznik. Do apartamentu albo do walizki."
      />
      <div className="flex flex-col space-y-6 px-5">
        {shopItems.map((item) => (
          <article key={item.id} className="flex flex-col space-y-4">
            <img
              src={item.image}
              alt={item.name}
              className="h-44 w-full shrink-0 rounded-[1.6rem] object-cover"
            />
            <div className="flex flex-col space-y-3">
              <h2 className="font-display text-2xl text-white">{item.name}</h2>
              <p className="text-sm leading-relaxed text-gray-300">
                {item.description}
              </p>
              <p className="text-lg font-semibold text-white">
                {formatEur(item.eur)}
              </p>
              <p className="text-sm text-gray-300">{formatPlnFromEur(item.eur)}</p>
              <button
                type="button"
                onClick={() => {
                  addItem({
                    id: `shop-${item.id}`,
                    kind: "shop",
                    title: item.name,
                    subtitle: "Sklep Monte Lux",
                    image: item.image,
                    eur: item.eur,
                    qty: 1,
                  });
                  toast.success("Dodano do koszyka");
                }}
                className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold"
              >
                Do koszyka
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
