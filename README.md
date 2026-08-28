# Monte Lux (`monteluxe.me`)

Kod strony i aplikacji rezerwacji: noclegi, wycieczki, wynajem auta, concierge nieruchomości.

## Cursor

```bash
git clone https://github.com/Malibos/monteluxe-me.git
cd monteluxe-me
npm install
npm run dev
```

Otwórz [http://localhost:8080](http://localhost:8080). W czacie Cursora: model **Grok 4.5 / 4.6**.

## Co jest w środku

| Folder | Co to |
|---|---|
| `src/routes` | Strony (start, hotele, samochody, nieruchomości, koszyk, panel) |
| `src/components` | Karty, nawigacja, layout desktop + telefon |
| `src/lib` | Katalog, koszyk, PayU, opłaty, concierge |
| `public/places` | Zdjęcia (portal, hotele, willa…) |
| `migrations` | Baza rezerwacji (PGLite) |

## Przydatne komendy

```bash
npm run typecheck
npm run build
```

## Panel gospodarza (demo)

- Login: `hello@monteluxe.me`
- Hasło: `MonteLux1!`

## PayU

Na razie bramka testowa (`/payu-demo`). Klucze produkcyjne: `PAYU_POS_ID`, `PAYU_MD5`, `PAYU_CLIENT_ID`, `PAYU_CLIENT_SECRET`.

## Domeny

Strona: [https://monteluxe.me](https://monteluxe.me)  
Mail: hello@monteluxe.me
