create policy "Users can check their own admin status"
on admins for select
using (auth.uid() = user_id);