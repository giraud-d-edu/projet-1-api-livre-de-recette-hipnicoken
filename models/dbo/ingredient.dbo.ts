import { ObjectId } from "npm:mongodb@5.6.0";

export interface IngredientDBO {
  _id: ObjectId;
  name: string;
}