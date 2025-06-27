CREATE TABLE public.action (
  user_id integer NOT NULL,
  recipe_id integer NOT NULL,
  rate integer,
  is_favorite boolean,
  comment text,
  CONSTRAINT action_pkey PRIMARY KEY (user_id, recipe_id),
  CONSTRAINT favorite_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id),
  CONSTRAINT favorite_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.category (
  name character varying NOT NULL,
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.diet (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  name character varying NOT NULL,
  CONSTRAINT diet_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ingredient (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  picture character varying,
  CONSTRAINT ingredient_pkey PRIMARY KEY (id)
);
CREATE TABLE public.list (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id integer NOT NULL,
  CONSTRAINT list_pkey PRIMARY KEY (id),
  CONSTRAINT list_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.list_recipe (
  list_id integer NOT NULL,
  recipe_id integer NOT NULL,
  number_people integer,
  CONSTRAINT list_recipe_pkey PRIMARY KEY (list_id, recipe_id),
  CONSTRAINT list_recipe_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.list(id)
);
CREATE TABLE public.recip_ingredient (
  quantity integer NOT NULL,
  ingredient_id integer NOT NULL,
  recipe_id integer NOT NULL,
  unity_id integer NOT NULL,
  CONSTRAINT recip_ingredient_pkey PRIMARY KEY (ingredient_id, recipe_id, unity_id),
  CONSTRAINT recip_ingredient_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id),
  CONSTRAINT recip_ingredient_unity_id_fkey FOREIGN KEY (unity_id) REFERENCES public.unity(id),
  CONSTRAINT recip_ingredient_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id)
);
CREATE TABLE public.recipe (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  time_preparation integer NOT NULL,
  description character varying NOT NULL,
  difficulty character varying NOT NULL,
  steps text NOT NULL,
  picture character varying,
  kcal integer NOT NULL,
  id_category integer NOT NULL,
  id_diet integer NOT NULL,
  date_creation date,
  CONSTRAINT recipe_pkey PRIMARY KEY (id),
  CONSTRAINT recipe_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.category(id),
  CONSTRAINT recipe_id_diet_fkey FOREIGN KEY (id_diet) REFERENCES public.diet(id)
);
CREATE TABLE public.recipe_utensil (
  recipe_id integer NOT NULL,
  utensil_id integer NOT NULL,
  CONSTRAINT recipe_utensil_pkey PRIMARY KEY (recipe_id, utensil_id),
  CONSTRAINT recipe_utensil_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id),
  CONSTRAINT recipe_utensil_utensil_id_fkey FOREIGN KEY (utensil_id) REFERENCES public.utensil(id)
);
CREATE TABLE public.unity (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  value character varying NOT NULL,
  CONSTRAINT unity_pkey PRIMARY KEY (id)
);
CREATE TABLE public.member (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL ,
  email character varying NOT NULL,
  role_id integer NOT NULL,
  password text NOT NULL CHECK (length(password) <= 50),
  admin boolean,
  CONSTRAINT member_pkey PRIMARY KEY (id)
);
CREATE TABLE public.utensil (
  name character varying NOT NULL,
  picture character varying,
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT utensil_pkey PRIMARY KEY (id)
);