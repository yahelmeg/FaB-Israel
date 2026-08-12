create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
claims jsonb;
  is_user_admin boolean;
begin
select exists (
    select 1 from admins where user_id = (event->>'user_id')::uuid
) into is_user_admin;

claims := event->'claims';
  claims := jsonb_set(claims, '{is_admin}', to_jsonb(is_user_admin));

return jsonb_build_object('claims', claims);
end;
$$;

grant execute on function public.custom_access_token_hook to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;