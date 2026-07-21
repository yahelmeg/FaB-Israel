create table listings (
    id uuid primary key default gen_random_uuid(),
    seller_id uuid references profiles(id) not null,
    card_name text not null,
    set_code text not null,
    image text not null,
    price numeric not null,
    condition text not null,
    foiling text not null,
    language text not null,
    is_visible boolean not null default true,
    created_at timestamptz not null default now()
);

alter table listings enable row level security;

create policy "Anyone can view visible listings"
on listings for select
using (is_visible = true);

create policy "Sellers can view their own listings"
on listings for select
to authenticated
using (auth.uid() = seller_id);

create policy "Admins can view all listings"
on listings for select
to authenticated
using (exists (select 1 from admins where user_id = auth.uid()));

create policy "Users can insert their own listings"
on listings for insert
to authenticated
with check (auth.uid() = seller_id);

create policy "Sellers can update their own listings"
on listings for update
to authenticated
using (auth.uid() = seller_id)
with check (auth.uid() = seller_id);