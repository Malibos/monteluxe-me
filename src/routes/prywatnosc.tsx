import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/prywatnosc")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Prawne"
        title="Prywatność"
        subtitle={`${SITE.domain} · ${SITE.email}`}
      />
      <div className="flex flex-col space-y-4 px-5 text-sm leading-relaxed text-gray-300">
        <p>
          Monte Lux działa na {SITE.domain}. Rezerwacje i koszyk zostają na
          Twoim telefonie, dopóki nie wyślesz zamówienia.
        </p>
        <p>
          Pytania, reklamacje i usunięcie danych: {SITE.email}. Nie sprzedajemy
          list gości.
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-slate-950"
        >
          Napisz do nas
        </a>
      </div>
    </div>
  );
}
