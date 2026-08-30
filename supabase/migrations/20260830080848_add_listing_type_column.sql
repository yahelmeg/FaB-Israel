create type listing_type as enum ('sell', 'buy');

alter table listings
    add column listing_type listing_type not null default 'sell';

update listings
set listing_type = 'sell'
where listing_type is null;

grant select on table listings to anon, authenticated;
grant insert, update on table listings to authenticated;