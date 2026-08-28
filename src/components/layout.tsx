import { Outlet, useRouterState } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { BottomNav } from "@/components/bottom-nav";
import { DesktopNav } from "@/components/desktop-nav";
import { StatusBar } from "@/components/status-bar";
import { cn } from "@/lib/utils";

export function DeviceLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const home = pathname === "/";

  return (
    <div className="min-h-dvh bg-black text-white">
      <div className="flex h-dvh flex-col overflow-hidden md:hidden">
        <div className="relative z-30 shrink-0 bg-slate-950/80 backdrop-blur-lg">
          <StatusBar />
        </div>
        <div className="phone-scroll min-h-0 flex-1">
          <Outlet />
        </div>
        <BottomNav />
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            className:
              "glass-strong !border-white/20 !bg-white/10 !text-white !backdrop-blur-lg",
          }}
        />
      </div>

      <div className="relative hidden min-h-dvh flex-col md:flex">
        <DesktopNav />
        <div
          className={cn(
            "flex-1",
            home
              ? ""
              : "overflow-y-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900",
          )}
        >
          <div className={home ? "" : "mx-auto w-full max-w-xl px-6 py-10"}>
            <Outlet />
          </div>
        </div>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            className:
              "glass-strong !border-white/20 !bg-white/10 !text-white !backdrop-blur-lg",
          }}
        />
      </div>
    </div>
  );
}
