import { IngredientRepository } from "../repositories/ingredient.repository.ts";
import { RecipeRepository } from "../repositories/recipe.repository.ts";
import { Ingredient } from "../models/ingredient.model.ts"; 

export const IngredientService = {
  async getAll(): Promise<Ingredient[]> {
    return await IngredientRepository.findAll();
  },

  async getById(id: string): Promise<Ingredient | null> {
    return await IngredientRepository.findById(id);
  },

  async getByName(name: string): Promise<Ingredient | null> {
    return await IngredientRepository.findByName(name);
  },

  async create(name: string): Promise<Ingredient> {
    // Vérifier si l'ingrédient existe déjà
    const existing = await IngredientRepository.findByName(name);
    if (existing) throw new Error("Cet ingrédient existe déjà.");

    return await IngredientRepository.insert({ name });
  },

  async isIngredientUsed(id: string): Promise<boolean> {
    // Vérifie si l'ingrédient est utilisé dans au moins une recette
    const recipesUsingIngredient = await RecipeRepository.findAll({ "ingredients.ingredientId": id });
    return recipesUsingIngredient.length > 0;
  },

  async delete(id: string): Promise<boolean> {
    // Vérifier si l'ingrédient est utilisé avant suppression
    const isUsed = await this.isIngredientUsed(id);
    if (isUsed) throw new Error("Impossible de supprimer cet ingrédient, il est utilisé dans des recettes.");

    const result = await IngredientRepository.delete(id);
    return result.deletedCount > 0;
  },
};
