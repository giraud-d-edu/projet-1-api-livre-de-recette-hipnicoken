import { RecipeRepository } from "../repositories/recipe.repository.ts";
import { IngredientRepository } from "../repositories/ingredient.repository.ts";
import { Recipe } from "../models/recipe.model.ts";

// 🎯 Service métier pour gérer les recettes
// C'est ici qu'on applique la logique métier (vérification, règles, etc.)
export const RecipeService = {

  // ✅ Récupérer toutes les recettes avec ou sans filtres
  async getAll(filters: any = {}): Promise<Recipe[]> {
    return await RecipeRepository.findAll(filters);
  },

  // ✅ Récupérer une recette par son ID
  async getById(id: string): Promise<Recipe | null> {
    return await RecipeRepository.findById(id);
  },

  // ✅ Récupérer une recette par son titre exact
  async getByTitle(title: string): Promise<Recipe | null> {
    return await RecipeRepository.findByTitle(title);
  },

  // ✅ Récupérer toutes les recettes d’une catégorie donnée
  async getByCategory(category: string): Promise<Recipe[]> {
    return await RecipeRepository.findByCategory(category);
  },

  // ✅ Récupérer toutes les recettes qui contiennent un ingrédient via son ID
  async getByIngredient(ingredientId: string): Promise<Recipe[]> {
    return await RecipeRepository.findByIngredient(ingredientId);
  },

  // ✅ Récupérer les recettes qui contiennent un ingrédient en se basant sur son nom
  async getByIngredientName(name: string) {
    const ingredient = await IngredientRepository.findByName(name);

    if (!ingredient) {
      return []; // Aucun ingrédient trouvé → pas de recette
    }

    return await RecipeRepository.findByIngredient(ingredient._id.toString());
  },

  // ✅ Créer une recette
  // On vérifie ici qu’aucune recette avec le même titre n’existe déjà
  async create(data: Omit<Recipe, "_id" | "createdAt" | "updatedAt">): Promise<Recipe> {
    const existing = await RecipeRepository.findByTitle(data.title);

    if (existing) {
      throw new Error("Cette recette existe déjà.");
    }

    return await RecipeRepository.insert(data);
  },

  // ✅ Mettre à jour une recette
  // Ici, on retourne directement la recette mise à jour, pas juste un booléen
  async update(id: string, data: Partial<Recipe>): Promise<Recipe | null> {
    const updated = await RecipeRepository.update(id, data);

    if (!updated) return null;

    return await RecipeRepository.findById(id); // On retourne la nouvelle version
  },

  // ✅ Supprimer une recette par son ID
  async delete(id: string): Promise<boolean> {
    const result = await RecipeRepository.delete(id);
    return result !== null;
  },
};
