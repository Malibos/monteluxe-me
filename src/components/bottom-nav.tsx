import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Store, UserRound } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Start", kind: "ml" as const },
  { to: "/koszyk", label: "Koszyk", kind: "cart" as const },
  { to: "/sklep", label: "Sklep", kind: "shop" as const },
  { to: "/konto", label: "Konto", kind: "account" as const },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useHydrated();
  const rawCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const count = hydrated ? rawCount : 0;

  return (
    <nav className="shrink-0 border-t border-white/20 bg-white/10 px-2 pb-2 pt-1.5 backdrop-blur-lg">
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const active =
            item.to === "/"
              ? pathname === "/"
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "relative flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-medium transition-colors duration-150",
                  active ? "text-white" : "text-gray-300 hover:text-white",
                )}
              >
                {item.kind === "ml" ? (
                  <span className="text-[15px] font-semibold tracking-tight">
                    ML
                  </span>
                ) : item.kind === "cart" ? (
                  <span className="relative">
                    <ShoppingBag className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                    {count > 0 ? (
                      <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-400 px-1 text-[9px] font-semibold text-slate-950">
                        {count}
                      </span>
                    ) : null}
                  </span>
                ) : item.kind === "shop" ? (
                  <Store className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                ) : (
                  <UserRound className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                )}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
