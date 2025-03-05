import { Ingredient } from "./ingredient.model";

export interface IngredientQuantity {
    ingredient: Ingredient;
    quantity: string;
}

export interface Recipe {
    id: number;
    name: string;
    ingredients: IngredientQuantity[];
}