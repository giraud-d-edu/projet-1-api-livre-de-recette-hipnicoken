import { IngredientRepository } from "../repositories/ingredient.repository.ts";
import { RecipeRepository } from "../repositories/recipe.repository.ts";

export const IngredientService = {
  async getAll() {
    return await IngredientRepository.findAll();
  },

  async getById(id: string) {
    return await IngredientRepository.findById(id);
  },

  async getByName(name: string) {
    return await IngredientRepository.findByName(name);
  },

  async create(name: string) {
    // Vérifier si l'ingrédient existe déjà
    const exists = await IngredientRepository.findByName(name);
    if (exists) throw new Error("Cet ingrédient existe déjà.");

    // Passer uniquement les données au repository (sans DBO ici)
    return await IngredientRepository.insert({ name });
  },

  async isIngredientUsed(id: string): Promise<boolean> {
    // Vérifie si l'ingrédient est utilisé dans au moins une recette
    const recipesUsingIngredient = await RecipeRepository.findAll({ "ingredients.ingredientId": id });
    return recipesUsingIngredient.length > 0;
  },

  async delete(id: string) {
    // Vérifier si l'ingrédient est utilisé avant de le supprimer
    const isUsed = await this.isIngredientUsed(id);
    if (isUsed) throw new Error("Impossible de supprimer cet ingrédient, il est utilisé dans des recettes.");

    return await IngredientRepository.delete(id);
  },
};
