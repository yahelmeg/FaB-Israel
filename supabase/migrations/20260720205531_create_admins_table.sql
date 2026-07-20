create table admins (
    user_id uuid primary key references profiles(id) on delete cascade
);

alter table admins enable row level security;