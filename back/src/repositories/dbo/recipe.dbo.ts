import { ObjectId } from "../../deps.ts";

export interface RecipeDBO {
  _id: ObjectId; 
  title: string;
  description: string;
  category: "Entrée" | "Plat" | "Dessert";
  ingredients: { ingredientId: ObjectId; String: number }[]; 
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
}
