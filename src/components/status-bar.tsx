import { useEffect, useState } from "react";
import { Signal, Wifi, Battery } from "lucide-react";

export function StatusBar() {
  const [time, setTime] = useState("09:41");

  useEffect(() => {
    const tick = () => setTime(formatTime());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex shrink-0 items-center justify-between px-7 pb-1 pt-3 text-white sm:pt-4">
      <span className="text-[13px] font-medium tabular-nums tracking-tight">
        {time}
      </span>
      <div className="flex items-center gap-1.5 text-white">
        <Signal className="size-3.5" strokeWidth={2.4} />
        <Wifi className="size-3.5" strokeWidth={2.4} />
        <Battery className="size-3.5" strokeWidth={2.4} />
      </div>
    </div>
  );
}

function formatTime() {
  return new Date().toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
