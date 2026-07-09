create table public.profiles (
                                 id uuid primary key references auth.users(id) on delete cascade,
                                 display_name text,
                                 phone_number text,
                                 discord_username text,
                                 onboarding_completed boolean not null default false,
                                 created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
    on public.profiles for select
                                      using (auth.uid() = id);

create policy "Users can update own profile"
    on public.profiles for update
                                      using (auth.uid() = id);

create or replace function public.handle_new_user()
    returns trigger as $$
begin
insert into public.profiles (id, display_name) values
    (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'));
return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();