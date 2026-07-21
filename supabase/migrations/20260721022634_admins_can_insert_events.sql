create policy "Admins can insert events"
on events for insert
to authenticated
with check (exists (select 1 from admins where user_id = auth.uid()));

grant insert on events to authenticated;