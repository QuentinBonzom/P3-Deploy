export interface TypeRecipe {
  id: number;
  name: string;
  time_preparation: number;
  description: string;
  difficulty: string;
  picture: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  kcal: number;
  recipe_name: string;
  rate: number;
  diet_name: string;
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
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface TypeIngredient {
  ingredient_name: string;
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
  ustensil_name: string;
  id: number;
  name: string;
}

export interface TypeList {
  id: number;
  user_id: number;
}

export interface TypeForm {
  name: string;
  lastname: string;
  email: string;
  message: string;
}

export interface TypeRandom {
  id: number;
  picture: string;
  name: string;
  time_preparation: number;
  rate: number;
}

export interface newMember {
  name: string;
  email: string;
  user_id: number;
  password: string;
}
