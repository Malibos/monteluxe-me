import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/wspolpraca")({
  component: PartnerPage,
});

function PartnerPage() {
  const [kind, setKind] = useState("Nekretnina");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  function send(e: FormEvent) {
    e.preventDefault();
    const body = [
      `Vrsta: ${kind}`,
      `Naziv: ${name}`,
      `Grad: ${city}`,
      `Telefon: ${phone}`,
      "",
      note,
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Objekat / nekretnina — " + name)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="flex flex-col pb-6">
      <PageHeader
        kicker="Partneri"
        title="Imate nekretninu?"
        subtitle="Želite da prodate ili izdate? Ostavite kontakt — javićemo Vam se. Unos radimo mi, ručno."
      />
      <form
        onSubmit={send}
        className="mx-5 flex flex-col space-y-4 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg"
      >
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none"
        >
          <option>Nekretnina</option>
          <option>Hotel / apartman</option>
          <option>Izlet (jeep, brod)</option>
          <option>Auto</option>
        </select>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Naziv objekta"
          className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-gray-300"
        />
        <input
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Grad (Budva, Bar, Kotor…)"
          className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-gray-300"
        />
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefon / Viber / WhatsApp"
          className="h-12 rounded-2xl border border-white/20 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-gray-300"
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Kratko: šta prodajete, koliko soba, cijena"
          rows={4}
          className="rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-300"
        />
        <button
          type="submit"
          className="btn-cyan flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold"
        >
          Pošaljite kontakt
        </button>
        <p className="text-center text-xs text-gray-300">{SITE.email}</p>
      </form>
    </div>
  );
}
