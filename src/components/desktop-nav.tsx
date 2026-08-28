import { Link, useRouterState } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { to: "/hotele", label: "Noclegi" },
  { to: "/wycieczki", label: "Wycieczki" },
  { to: "/samochody", label: "Wynajem" },
  { to: "/nieruchomosci", label: "Nieruchomości" },
  { to: "/konto", label: "Konto" },
] as const;

export function DesktopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const home = pathname === "/";

  return (
    <header
      className={cn(
        "hidden md:flex items-center justify-between px-8 py-4",
        home
          ? "absolute inset-x-0 top-0 z-30"
          : "sticky top-0 z-30 border-b border-white/15 bg-slate-950/70 backdrop-blur-xl",
      )}
    >
      <Link to="/" className="font-display text-2xl tracking-wide text-white">
        {SITE.name}
      </Link>
      <nav className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 backdrop-blur-lg">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm",
              pathname === l.to || pathname.startsWith(`${l.to}/`)
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:text-white",
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
