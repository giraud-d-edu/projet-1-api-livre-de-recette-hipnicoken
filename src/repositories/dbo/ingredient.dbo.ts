import { ObjectId } from "../../../deps.ts";

export interface IngredientDBO {
  _id: ObjectId | string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
