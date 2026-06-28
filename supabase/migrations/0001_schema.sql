-- CopyFlow — schema do histórico de gerações.
-- Auth é o próprio Supabase Auth (auth.users); cada usuário só enxerga as
-- próprias gerações (RLS). A chave da Claude API NÃO fica aqui — vive na função
-- serverless /api/generate, no servidor.

create extension if not exists pgcrypto;

create table if not exists generations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  tipo        text not null,
  input_json  jsonb,
  output_json jsonb,
  idioma      text not null default 'pt',
  tom         text not null default 'profissional',
  favorito    boolean not null default false,
  criado_em   timestamptz not null default now()
);

alter table generations enable row level security;

-- Cada usuário acessa (e cria) apenas as próprias gerações.
create policy generations_own
  on generations for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create index if not exists generations_user_criado_idx
  on generations (user_id, criado_em desc);
