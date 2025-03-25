export interface Ingredient {
  id: string;
  name: string;
}

export interface Recette {
  id: string;
  nom: string;
  description: string;
  ingredients: Ingredient[];
}

export interface RecetteDTO {
  nom: string;
  description: string;
  ingredients: string[]; // liste d'IDs
}
