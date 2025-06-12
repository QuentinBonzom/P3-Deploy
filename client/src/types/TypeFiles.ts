export interface TypeRecipe {
  id: number;
  name: string;
  time_preparation: number;
  description: string;
  difficulty: string;
  steps: string;
  kcal: number;
  recipe_name: string;
}

export interface TypeDiet {
  id: number;
  name: string;
}

export interface TypeCategory {
  id: number;
  name: string;
}

export interface TypeUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface TypeIngredient {
  id: number;
  name: string;
  picture: string;
}

export interface TypeUnity {
  id: number;
  value: number;
}

export interface TypeAction {
  rate: number;
  is_favorite: boolean;
  comment: string;
}

export interface TypeUstencil {
  id: number;
  name: string;
}

export interface TypeList {
  id: number;
  user_id: number;
}
