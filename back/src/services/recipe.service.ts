import { RecipeRepository } from "../repositories/recipe.repository.ts";
import { IngredientRepository } from "../repositories/ingredient.repository.ts";
import { Recipe } from "../models/recipe.model.ts";

export const RecipeService = {
  async getAll(filters: any = {}): Promise<Recipe[]> {
    return await RecipeRepository.findAll(filters);
  },

  async getById(id: string): Promise<Recipe | null> {
    return await RecipeRepository.findById(id);
  },

  async getByTitle(title: string): Promise<Recipe | null> {
    return await RecipeRepository.findByTitle(title);
  },

  async getByCategory(category: string): Promise<Recipe[]> {
    return await RecipeRepository.findByCategory(category);
  },

  async getByIngredient(ingredientId: string): Promise<Recipe[]> {
    return await RecipeRepository.findByIngredient(ingredientId);
  },

  async getByIngredientName(name: string) {
    const ingredient = await IngredientRepository.findByName(name);
    if (!ingredient) {
        return []; // Aucun ingrédient trouvé, retourne un tableau vide
    }
    return await RecipeRepository.findByIngredient(ingredient._id.toString());
  },

  async create(data: Omit<Recipe, "_id" | "createdAt" | "updatedAt">): Promise<Recipe> {
    const existing = await RecipeRepository.findByTitle(data.title);
    if (existing) {
      throw new Error("Cette recette existe déjà.");
    }

    return await RecipeRepository.insert(data);
  },

  async update(id: string, data: Partial<Recipe>): Promise<Recipe | null> {
    const updated = await RecipeRepository.update(id, data);
    if (!updated) return null;
  
    return await RecipeRepository.findById(id);
  },
  

  async delete(id: string): Promise<boolean> {
    const result = await RecipeRepository.delete(id);
    return result !== null;
  },
};
