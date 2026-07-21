create policy "Admins can view all events"
on events for select
to authenticated
using (exists (select 1 from admins where user_id = auth.uid()));