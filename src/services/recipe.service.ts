import { RecipeRepository } from "../repositories/recipe.repository.ts";
import { RecipeDBO } from "../models/dbo/recipe.dbo.ts";
import { ObjectId } from "../../deps.ts";

export const RecipeService = {
  async getAll(filters: any = {}) {
    return await RecipeRepository.findAll(filters);
  },

  async getById(id: string) {
    return await RecipeRepository.findById(id);
  },

  async create(data: RecipeDBO) {
    const existing = await RecipeRepository.findByTitle(data.title);
    if (existing) throw new Error("Cette recette existe déjà.");

    data._id = new ObjectId().toString();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return await RecipeRepository.insert(data);
  },

  async update(id: string, data: Partial<RecipeDBO>) {
    data.updatedAt = new Date();
    return await RecipeRepository.update(id, data);
  },

  async delete(id: string) {
    return await RecipeRepository.delete(id);
  },
};
