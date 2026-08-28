import {
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { DeviceLayout } from "@/components/layout";
import { SITE } from "@/lib/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.name },
      {
        name: "description",
        content:
          "Noclegi, wycieczki, wynajem samochodu i agencje nieruchomości w Czarnogórze. Monte Lux — monteluxe.me",
      },
      { name: "theme-color", content: "#000000" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pl_PL" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:url", content: SITE.url },
      { property: "og:title", content: "Monte Lux — Czarnogóra" },
      {
        property: "og:description",
        content:
          "Noclegi, wycieczki, wynajem samochodu i agencje nieruchomości. Rezerwacja z telefonu.",
      },
      { property: "og:image", content: `${SITE.url}/og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Monte Lux — Czarnogóra" },
      {
        name: "twitter:description",
        content:
          "Noclegi, wycieczki, wynajem samochodu i agencje nieruchomości.",
      },
      { name: "twitter:image", content: `${SITE.url}/og.jpg` },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "canonical", href: SITE.url },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Outfit:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="pl" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white">
        <PreviewHostBridge />
        <AuthProvider>
          <DeviceLayout />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
