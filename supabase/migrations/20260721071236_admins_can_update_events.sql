create policy "Admins can update events"
on events for update
to authenticated
using (exists (select 1 from admins where user_id = auth.uid()));

grant update on events to authenticated;