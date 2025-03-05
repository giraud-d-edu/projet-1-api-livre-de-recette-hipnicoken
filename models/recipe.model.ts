import { Ingredient } from "./ingredient.model.ts";

export interface IngredientQuantity {
    ingredient: Ingredient;
    quantity: string;
}

export interface Recipe {
    id: number;
    name: string;
    category: string;
    description: string;
    ingredients: IngredientQuantity[];
}