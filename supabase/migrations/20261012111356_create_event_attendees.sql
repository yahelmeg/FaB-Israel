begin;

create table public.event_attendees (
    event_id uuid not null references public.events(id)   on delete cascade,
    user_id uuid not null references public.profiles(id) on delete cascade,
    created_at timestamptz not null default now(),
    primary key (event_id, user_id)
);

create index event_attendees_user_id_idx on public.event_attendees (user_id);

alter table public.event_attendees enable row level security;

create policy "join as self" on public.event_attendees
    for insert to authenticated
    with check (user_id = (select auth.uid()));

create policy "leave as self" on public.event_attendees
    for delete to authenticated
    using (user_id = (select auth.uid()));

create policy "read own" on public.event_attendees
    for select to authenticated
    using (user_id = (select auth.uid()));

create policy "admin read all" on public.event_attendees
    for select to authenticated
    using (
        exists (
           select 1 from public.admins
           where admins.user_id = (select auth.uid()
        )
    )
);

create view public.event_attendee_counts as
select event_id, count(*)::int as attendee_count
from public.event_attendees
group by event_id;

grant select on public.event_attendee_counts to anon, authenticated;

commit;