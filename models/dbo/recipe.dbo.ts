import { ObjectId } from "npm:mongodb@5.6.0";
import { IngredientDBO } from "./ingredient.dbo";

export interface IngredientQuantityDBO {
    ingredient: IngredientDBO;
    quantity: string;
}
  
export interface RecipeDBO {
  _id: ObjectId;
  name: string;
  ingredients: IngredientQuantityDBO[];
}
  