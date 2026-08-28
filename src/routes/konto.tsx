import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/lib/cart";
import { FACEBOOK_POST, SITE } from "@/lib/site";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/konto")({ component: AccountPage });

function AccountPage() {
  const hydrated = useHydrated();
  const guestName = useCart((s) => s.guestName);
  const setGuestName = useCart((s) => s.setGuestName);
  const [draft, setDraft] = useState("");
  const shown = hydrated ? guestName : "";

  function save(e: FormEvent) {
    e.preventDefault();
    const name = (draft || shown).trim();
    setGuestName(name);
    toast.success(name ? "Zapisano" : "Wyczyszczono");
  }

  async function copyPost() {
    try {
      await navigator.clipboard.writeText(FACEBOOK_POST);
      toast.success("Post skopiowany — wklej na forum");
    } catch {
      toast.error("Skopiuj ręcznie z pola poniżej");
    }
  }

  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE.url)}`;

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Konto"
        title="Gość Monte Lux"
        subtitle="Imię na tym telefonie. Forum — kopiujesz post i wklejasz."
      />
      <form onSubmit={save} className="mx-5 flex flex-col space-y-4 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={shown || "Imię"} className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-gray-300" />
        <button type="submit" className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold">Zapisz profil</button>
      </form>
      <div className="mx-5 mt-5 flex flex-col space-y-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-300">Forum / Facebook</p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{FACEBOOK_POST}</p>
        <button type="button" onClick={() => void copyPost()} className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold">Kopiuj post</button>
        <a href={fb} target="_blank" rel="noreferrer" className="flex h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-medium text-white">Otwórz Facebook</a>
      </div>
      <div className="mx-5 mt-5 flex flex-col space-y-3 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg">
        <a href={SITE.url} className="text-base text-white">{SITE.domain}</a>
        <a href={`mailto:${SITE.email}`} className="text-sm text-cyan-300">{SITE.email}</a>
        <Link to="/panel" className="text-sm text-cyan-300">Panel rezerwacji</Link>
        <Link to="/wspolpraca" className="text-sm text-cyan-300">Imate nekretninu?</Link>
      </div>
    </div>
  );
}
