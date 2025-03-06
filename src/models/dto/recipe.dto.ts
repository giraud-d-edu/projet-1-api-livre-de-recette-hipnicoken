import { z } from "zod";

// Définir un schéma pour un ingrédient qui accepte soit ingredientId, soit ingredientName
export const IngredientDTO = z
  .object({
    ingredientId: z.string().optional(),
    ingredientName: z.string().optional(),
    quantity: z.string(),
  })
  // On exige qu'au moins ingredientId ou ingredientName soit présent
  .refine((data) => data.ingredientId || data.ingredientName, {
    message: "Chaque ingrédient doit avoir soit 'ingredientId' soit 'ingredientName'.",
  });

export const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(["Entrée", "Plat", "Dessert"]),
  ingredients: z.array(IngredientDTO),
  instructions: z.string(),
});
