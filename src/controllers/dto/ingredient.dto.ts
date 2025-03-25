import { z } from "../../deps.ts";

export const IngredientSchema = z.object({
  name: z.string().min(2),
});

export type IngredientDTO = z.infer<typeof IngredientSchema>;
