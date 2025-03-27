import { Category } from "../constants/category.ts";

export interface Recipe {
  _id?: string; // En string car les services ne manipulent pas d'ObjectId directement
  title: string;
  description: string;
  category: Category;
  ingredients: { ingredientId: string; quantity: string }[]; // IDs sous forme de string
  instructions: string;
  createdAt?: Date;
  updatedAt?: Date;
}

