-- ==============================================================================
-- NUTRITRACK - SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null default 'Healthy User',
  age integer check (age > 0 and age < 130),
  gender text check (gender in ('male', 'female', 'other', 'prefer_not_to_say')),
  height_cm numeric(5, 2) check (height_cm > 40 and height_cm < 280),
  weight_kg numeric(5, 2) check (weight_kg > 20 and weight_kg < 400),
  dietary_preference text not null default 'omnivore',
  allergies text[] not null default '{}',
  activity_level text not null default 'moderate',
  nutrition_goal text not null default 'balanced_nutrition',
  is_onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. NUTRITION GOALS TABLE
create table if not exists public.nutrition_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  calories_target integer not null default 2000 check (calories_target > 500 and calories_target < 10000),
  protein_target numeric(5, 1) not null default 120 check (protein_target >= 0),
  carbs_target numeric(5, 1) not null default 220 check (carbs_target >= 0),
  fat_target numeric(5, 1) not null default 65 check (fat_target >= 0),
  fiber_target numeric(5, 1) default 28 check (fiber_target >= 0),
  updated_at timestamptz not null default now()
);

-- 3. MEALS TABLE
create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  meal_name text not null,
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack')),
  meal_image_url text,
  meal_date date not null default current_date,
  meal_time text default to_char(now(), 'HH24:MI'),
  total_calories integer not null default 0 check (total_calories >= 0),
  total_protein numeric(6, 1) not null default 0 check (total_protein >= 0),
  total_carbs numeric(6, 1) not null default 0 check (total_carbs >= 0),
  total_fat numeric(6, 1) not null default 0 check (total_fat >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. MEAL ITEMS TABLE
create table if not exists public.meal_items (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid references public.meals(id) on delete cascade not null,
  food_name text not null,
  quantity numeric(6, 2) not null default 1 check (quantity > 0),
  serving_unit text not null default 'portion',
  weight_grams numeric(6, 1) not null default 100 check (weight_grams >= 0),
  calories integer not null default 0 check (calories >= 0),
  protein numeric(6, 1) not null default 0 check (protein >= 0),
  carbohydrates numeric(6, 1) not null default 0 check (carbohydrates >= 0),
  fat numeric(6, 1) not null default 0 check (fat >= 0),
  source text not null default 'verified_db' check (source in ('verified_db', 'ai_estimate', 'custom')),
  confidence_score numeric(4, 2),
  created_at timestamptz not null default now()
);

-- 5. RECIPES TABLE
create table if not exists public.recipes (
  id text primary key,
  name text not null,
  description text,
  image_url text,
  prep_time_minutes integer not null default 15,
  cook_time_minutes integer not null default 20,
  difficulty text not null default 'Medium' check (difficulty in ('Easy', 'Medium', 'Hard')),
  servings integer not null default 2 check (servings > 0),
  calories_per_serving integer not null check (calories_per_serving >= 0),
  protein_per_serving numeric(5, 1) not null check (protein_per_serving >= 0),
  carbs_per_serving numeric(5, 1) not null check (carbs_per_serving >= 0),
  fat_per_serving numeric(5, 1) not null check (fat_per_serving >= 0),
  dietary_tags text[] not null default '{}',
  allergens text[] not null default '{}',
  instructions text[] not null default '{}',
  cuisine text default 'Indian',
  created_at timestamptz not null default now()
);

-- 6. RECIPE INGREDIENTS TABLE
create table if not exists public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id text references public.recipes(id) on delete cascade not null,
  ingredient_name text not null,
  quantity text not null,
  unit text not null,
  is_optional boolean not null default false
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
create index if not exists idx_meals_user_date on public.meals(user_id, meal_date desc);
create index if not exists idx_meal_items_meal_id on public.meal_items(meal_id);
create index if not exists idx_nutrition_goals_user_id on public.nutrition_goals(user_id);
create index if not exists idx_recipe_ingredients_recipe_id on public.recipe_ingredients(recipe_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.nutrition_goals enable row level security;
alter table public.meals enable row level security;
alter table public.meal_items enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;

-- Profiles: Users can only see and update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Nutrition Goals: Users manage only their own goals
create policy "Users can view own nutrition goals"
  on public.nutrition_goals for select
  using (auth.uid() = user_id);

create policy "Users can insert own nutrition goals"
  on public.nutrition_goals for insert
  with check (auth.uid() = user_id);

create policy "Users can update own nutrition goals"
  on public.nutrition_goals for update
  using (auth.uid() = user_id);

-- Meals: Users can view, insert, update, delete only their own meals
create policy "Users can view own meals"
  on public.meals for select
  using (auth.uid() = user_id);

create policy "Users can insert own meals"
  on public.meals for insert
  with check (auth.uid() = user_id);

create policy "Users can update own meals"
  on public.meals for update
  using (auth.uid() = user_id);

create policy "Users can delete own meals"
  on public.meals for delete
  using (auth.uid() = user_id);

-- Meal Items: Accessed only via parent meal user verification
create policy "Users can view own meal items"
  on public.meal_items for select
  using (
    exists (
      select 1 from public.meals
      where meals.id = meal_items.meal_id
      and meals.user_id = auth.uid()
    )
  );

create policy "Users can insert own meal items"
  on public.meal_items for insert
  with check (
    exists (
      select 1 from public.meals
      where meals.id = meal_items.meal_id
      and meals.user_id = auth.uid()
    )
  );

create policy "Users can update own meal items"
  on public.meal_items for update
  using (
    exists (
      select 1 from public.meals
      where meals.id = meal_items.meal_id
      and meals.user_id = auth.uid()
    )
  );

create policy "Users can delete own meal items"
  on public.meal_items for delete
  using (
    exists (
      select 1 from public.meals
      where meals.id = meal_items.meal_id
      and meals.user_id = auth.uid()
    )
  );

-- Recipes: Publicly readable for authenticated and anonymous users
create policy "Recipes are readable by all users"
  on public.recipes for select
  using (true);

create policy "Recipe ingredients are readable by all users"
  on public.recipe_ingredients for select
  using (true);

-- ==============================================================================
-- AUTOMATIC NEW USER INITIALIZATION TRIGGER
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- 1. Create default profile
  insert into public.profiles (id, full_name, is_onboarded)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    false
  );

  -- 2. Create default nutrition goals (2,000 kcal baseline)
  insert into public.nutrition_goals (user_id, calories_target, protein_target, carbs_target, fat_target)
  values (new.id, 2000, 120, 220, 65);

  return new;
end;
$$ language plpgsql security definer;

-- Trigger firing whenever an auth.user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
