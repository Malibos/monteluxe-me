import { Link2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { mapsUrl } from "@/lib/data";
import { SITE, sitePath } from "@/lib/site";
import { sharePlace } from "@/lib/utils";

export function PlaceActions({
  name,
  lat,
  lng,
  path,
}: {
  name: string;
  lat: number;
  lng: number;
  path?: string;
}) {
  const map = mapsUrl(lat, lng);
  const shareUrl =
    path != null
      ? sitePath(path)
      : typeof window !== "undefined"
        ? sitePath(window.location.pathname)
        : SITE.url;

  async function share() {
    const result = await sharePlace(`${name} · ${SITE.name}`, shareUrl);
    if (result === "copied") toast.success("Link skopiowany — wklej na FB");
    if (result === "failed") toast.error("Nie udało się udostępnić");
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={map}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-medium text-white backdrop-blur-lg"
        >
          <MapPin className="size-3.5" />
          Mapa
        </a>
        <button
          type="button"
          onClick={() => void share()}
          className="flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-medium text-white backdrop-blur-lg"
        >
          <Link2 className="size-3.5" />
          Kopiuj link
        </button>
      </div>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noreferrer"
        className="flex h-11 w-full items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-medium text-white backdrop-blur-lg"
      >
        Facebook
      </a>
    </div>
  );
}
