import { ObjectId } from "npm:mongodb@5.6.0";
import { IngredientDBO } from "./ingredient.dbo.ts";

export interface IngredientQuantityDBO {
    ingredient: IngredientDBO;
    quantity: string;
}
  
export interface RecipeDBO {
  _id: ObjectId;
  name: string;
  category: string;
  description: string;
  ingredients: IngredientQuantityDBO[];
}
  