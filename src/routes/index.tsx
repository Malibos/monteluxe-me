import { createFileRoute, Link } from "@tanstack/react-router";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/data";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

const tiles = services.filter((s) => s.slug !== "restauracje");

function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative hidden min-h-dvh md:block">
        <img
          src="https://monteluxe.me/places/portal.jpg"
          alt="Adriatyk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/45 via-transparent to-cyan-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/50 via-transparent to-sky-900/25" />
        <div className="relative flex min-h-dvh flex-col justify-end px-10 pb-12 pt-28">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-100">
            {SITE.country} · {SITE.domain}
          </p>
          <h1 className="mt-3 max-w-xl font-display text-7xl leading-[0.9] text-white drop-shadow">
            Monte <span className="italic text-cyan-100">Lux</span>
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">
            Noclegi, wycieczki, wynajem samochodu i agencje nieruchomości.
            Słońce, zatoka, telefon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/hotele" className="btn-cyan inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold">
              Rezerwuj nocleg
            </Link>
            <Link to="/nieruchomosci" className="inline-flex h-12 items-center rounded-full border border-white/25 bg-white/10 px-6 text-sm text-white backdrop-blur-lg">
              Zatrudnij eksperta
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-3">
            {tiles.map((s) => (
              <Link key={s.slug} to={s.href} className="flex flex-col space-y-2 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl transition hover:border-cyan-400/50 hover:bg-white/15">
                <span className="text-[11px] uppercase tracking-[0.18em] text-gray-300">
                  {s.slug === "hotele" ? "01" : s.slug === "wycieczki" ? "02" : s.slug === "samochody" ? "03" : "04"}
                </span>
                <span className="font-medium text-white">{s.title}</span>
                <span className="text-xs leading-relaxed text-gray-300">{s.hint}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="relative md:hidden">
        <img src="https://monteluxe.me/places/portal.jpg" alt="Adriatyk" className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-sky-950/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col space-y-1 px-5 pb-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-300">{SITE.country}</p>
          <h1 className="font-display text-[2.35rem] leading-none text-white">{SITE.name}</h1>
          <p className="max-w-[20rem] text-sm leading-relaxed text-gray-300">
            Noclegi, wycieczki, wynajem samochodu i agencje nieruchomości.
          </p>
        </div>
      </section>
      <section className="flex flex-col space-y-3 px-5 pb-6 pt-5 md:hidden">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-300">Usługi</h2>
        <div className="flex flex-col space-y-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <Link to="/wspolpraca" className="flex flex-col space-y-1 rounded-[1.4rem] border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-lg">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-300">Imate nekretninu?</span>
          <span className="text-base font-medium text-white">Želite da prodate? Ostavite kontakt.</span>
          <span className="text-sm text-gray-300">Javićemo se. Unos radimo mi.</span>
        </Link>
      </section>
    </div>
  );
}
