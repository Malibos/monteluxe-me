import { Link } from "@tanstack/react-router";
import {
  Building2,
  Car,
  ChevronRight,
  House,
  Ship,
  UtensilsCrossed,
} from "lucide-react";
import type { services } from "@/lib/data";

const icons = {
  building: Building2,
  car: Car,
  utensils: UtensilsCrossed,
  home: House,
  ship: Ship,
};

type Service = (typeof services)[number];

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      to={service.href}
      className="flex w-full items-center gap-3 rounded-[1.4rem] border border-white/20 bg-white/10 p-4 text-white backdrop-blur-lg"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col space-y-0.5">
        <span className="text-base font-medium text-white">{service.title}</span>
        <span className="text-xs leading-relaxed text-gray-300">
          {service.hint}
        </span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-gray-300" />
    </Link>
  );
}
