-- Phase 1: roles, admin check, audit log. Run in Supabase SQL editor or via `supabase db push`.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'visitor' check (role in ('visitor','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor uuid references auth.users(id),
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Every new user starts as a visitor; admin role can only be granted by SQL/service role.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.audit_log enable row level security;

-- Users read only their own profile; nobody can change roles from the client.
create policy "own profile read" on public.profiles for select using (id = auth.uid());

-- Only admins read or append audit entries.
create policy "admin read audit" on public.audit_log for select using (public.is_admin());
create policy "admin insert audit" on public.audit_log for insert with check (public.is_admin() and actor = auth.uid());

-- After the admin signs up, grant the role once (replace the email):
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'ADMIN_EMAIL_HERE');
