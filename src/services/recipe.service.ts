import { RecipeRepository } from "../repositories/recipe.repository.ts";
import { IngredientRepository } from "../repositories/ingredient.repository.ts"; // Assure-toi que ce fichier existe et a une méthode findByName
import { RecipeDBO } from "../models/dbo/recipe.dbo.ts";

export const RecipeService = {
  async getAll(filters: any = {}) {
    return await RecipeRepository.findAll(filters);
  },

  async getById(id: string) {
    return await RecipeRepository.findById(id);
  },

  async getByTitle(title: string) {
    return await RecipeRepository.findByTitle(title);
  },

  async getByCategory(category: string) {
    return await RecipeRepository.findByCategory(category);
  },

  async getByIngredient(ingredient: string) {
    return await RecipeRepository.findByIngredient(ingredient);
  },

  async getByIngredientName(name: string) {
    // Recherche l'ingrédient par nom dans la collection des ingrédients
    const ingredient = await IngredientRepository.findByName(name);
    if (!ingredient) {
      return []; // Aucun ingrédient trouvé, retourne un tableau vide
    }
    // Utilise l'ID de l'ingrédient trouvé pour rechercher les recettes
    return await RecipeRepository.findByIngredient(ingredient._id.toString());
  },

  async create(data: Omit<RecipeDBO, "_id" | "createdAt" | "updatedAt">) {
    const existing = await RecipeRepository.findByTitle(data.title);
    if (existing) throw new Error("Cette recette existe déjà.");

    return await RecipeRepository.insert(data);
  },

  async update(id: string, data: Partial<RecipeDBO>) {
    return await RecipeRepository.update(id, { ...data, updatedAt: new Date() });
  },

  async delete(id: string) {
    return await RecipeRepository.delete(id);
  },
};
