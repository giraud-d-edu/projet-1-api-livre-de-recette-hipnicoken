import { z } from "../../../deps.ts";

export const RecipeSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  category: z.enum(["Entrée", "Plat", "Dessert"]),
  ingredients: z.array(z.object({ ingredientId: z.string(), quantity: z.string() })),
  instructions: z.string(),
});

export type RecipeDTO = z.infer<typeof RecipeSchema>;
