import { IngredientRepository } from "../repositories/ingredient.repository.ts";
import { RecipeRepository } from "../repositories/recipe.repository.ts";

export const IngredientService = {
  async getAll() {
    return await IngredientRepository.findAll();
  },

  async getById(id: string) {
    return await IngredientRepository.findById(id);
  },

  async create(name: string) {
    const exists = await IngredientRepository.findByName(name);
    if (exists) throw new Error("Cet ingrédient existe déjà.");

    // On passe simplement le nom à la méthode d'insertion du repository,
    // qui se chargera d'ajouter _id, createdAt et updatedAt.
    return await IngredientRepository.insert({ name });
  },

  async delete(id: string) {
    const recipesUsingIngredient = await RecipeRepository.findAll({
      "ingredients.ingredientId": id
    });
    if (recipesUsingIngredient.length > 0)
      throw new Error("Impossible de supprimer cet ingrédient, il est utilisé dans des recettes.");

    return await IngredientRepository.delete(id);
  },
};
