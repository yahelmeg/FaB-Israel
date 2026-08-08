alter table events
add column status text not null default 'upcoming'
check (status in ('upcoming', 'completed', 'cancelled'));

update events
set status = case
    when is_visible = true then 'upcoming'
    else 'cancelled'
end;