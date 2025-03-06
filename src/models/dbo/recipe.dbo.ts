import { ObjectId } from "../../../deps.ts";

export interface RecipeDBO {
  _id: ObjectId | string; // ✅ Correction ici pour MongoDB
  title: string;
  description: string;
  category: "Entrée" | "Plat" | "Dessert";
  ingredients: { ingredientId: ObjectId | string; quantity: string }[]; // ✅ Correction ici
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
}
