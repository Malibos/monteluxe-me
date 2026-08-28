create table if not exists staff (
  id text primary key,
  email text unique not null,
  password_hash text not null,
  role text not null,
  listing_ids text not null default '',
  name text not null
);

create table if not exists staff_sessions (
  token text primary key,
  staff_id text not null,
  expires_at timestamptz not null
);

create table if not exists bookings (
  id text primary key,
  listing_id text not null,
  kind text not null,
  title text not null,
  image text,
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  check_in text,
  check_out text,
  guests integer not null default 1,
  fee_pln_grosze integer not null,
  rest_on_site_eur numeric not null default 0,
  status text not null,
  payu_order_id text,
  host_note text,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  confirmed_at timestamptz
);

create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_listing_idx on bookings (listing_id);
