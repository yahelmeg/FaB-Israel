create table events (
    id uuid primary key default gen_random_uuid(),
    title text not null ,
    date date not null,
    time time not null,
    format text not null,
    tier text not null,
    store text,
    address text,
    register_url text,
    is_visible boolean not null default true,
    created_at timestamptz not null default now(),
    created_by uuid references profiles(id)
);

alter table events enable row level security;

create policy "Anyone can view visible events"
on events for select
using (is_visible = true);

grant select on events to authenticated, anon;
