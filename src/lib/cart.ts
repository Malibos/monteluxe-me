import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartKind = "hotel" | "car" | "restaurant" | "property" | "shop" | "tour";

export type CartItem = {
  id: string;
  kind: CartKind;
  title: string;
  subtitle: string;
  image: string;
  eur: number;
  qty: number;
  listingId?: string;
  checkIn?: string;
  checkOut?: string;
  pickupTime?: string;
  pickupPlace?: string;
  guests?: number;
  feeEur?: number;
  feePln?: number;
  restOnSiteEur?: number;
};

type CartState = {
  items: CartItem[];
  guestName: string;
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  setGuestName: (name: string) => void;
  clear: () => void;
};

function uid() {
  return `ml-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      guestName: "",
      addItem: (item) => {
        const id = item.id ?? uid();
        set({ items: [{ ...item, id }, ...get().items] });
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      setGuestName: (guestName) => set({ guestName }),
      clear: () => set({ items: [] }),
    }),
    { name: "monte-lux-cart" },
  ),
);

export const kindLabel: Record<CartKind, string> = {
  hotel: "Nocleg",
  car: "Samochód",
  restaurant: "Stolik",
  property: "Concierge",
  shop: "Sklep",
  tour: "Wycieczka",
};

export function payableFeeEur(item: CartItem) {
  return item.feeEur ?? 0;
}

export function payableGrosze(item: CartItem) {
  if (item.feePln != null) return Math.round(item.feePln * 100) * item.qty;
  return Math.round((item.feeEur ?? 0) * item.qty * 4.3 * 100);
}
