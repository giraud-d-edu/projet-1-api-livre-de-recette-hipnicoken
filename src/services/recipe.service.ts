import { RecipeRepository } from "../repositories/recipe.repository.ts";
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
