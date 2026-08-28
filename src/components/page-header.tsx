import { ChevronLeft } from "lucide-react";

export function PageHeader({
  title,
  kicker,
  subtitle,
  backTo = "/",
  backLabel = "Start",
}: {
  title: string;
  kicker?: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
}) {
  return (
    <header className="flex flex-col px-5 pb-4 pt-1">
      <a
        href={backTo}
        className="-ml-1 mb-3 inline-flex h-10 items-center gap-0.5 self-start rounded-full px-1 text-sm text-white"
      >
        <ChevronLeft className="size-5" />
        {backLabel}
      </a>
      {kicker ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-300">
          {kicker}
        </p>
      ) : null}
      <h1 className="mt-1 font-display text-[1.85rem] leading-none text-white">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-gray-300">{subtitle}</p>
      ) : null}
    </header>
  );
}
