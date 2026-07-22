drop policy "Anyone can view visible listings" on listings;

alter table listings add column status text not null default 'active'
check (status in ('active', 'fulfilled', 'removed'));

alter table listings drop column is_visible;

create policy "Anyone can view active listings"
on listings for select
using (status = 'active');