import { RecipeService } from "../services/recipe.service.ts";
import { RecipeSchema } from "./dto/recipe.dto.ts";
import { Context } from "../deps.ts";
import { ObjectId } from "../deps.ts";
import { IngredientService } from "../services/ingredient.service.ts";

export const RecipeController = {
  // ✅ GET /recipes — avec options de filtres (id, title, category, ingredientName ou ingredientId)
  async getAll(ctx: Context) {
    const params = ctx.request.url.searchParams;

    // 🎯 Filtrage par ID (via query param)
    if (params.has("id")) {
      const id = params.get("id");
      if (id) {
        ctx.response.body = await RecipeService.getById(id);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "ID requis" };
      }

    // 🔍 Filtrage par titre
    } else if (params.has("title")) {
      const title = params.get("title");
      if (title) {
        ctx.response.body = await RecipeService.getByTitle(title);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "Title requis" };
      }

    // 🍽️ Filtrage par catégorie
    } else if (params.has("category")) {
      const category = params.get("category");
      if (category) {
        ctx.response.body = await RecipeService.getByCategory(category);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "Category requis" };
      }

    // 🧂 Recherche par nom d'ingrédient (ex: ?ingredientName=Sel)
    } else if (params.has("ingredientName")) {
      const ingredientName = params.get("ingredientName");
      if (ingredientName) {
        ctx.response.body = await RecipeService.getByIngredientName(ingredientName);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "Ingredient name requis" };
      }
      return;

    // 🧪 Recherche par ID d'ingrédient
    } else if (params.has("ingredient")) {
      const ingredient = params.get("ingredient");
      if (ingredient) {
        ctx.response.body = await RecipeService.getByIngredient(ingredient);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "Ingredient requis" };
      }

    // 📋 Sinon on retourne toutes les recettes
    } else {
      ctx.response.body = await RecipeService.getAll();
    }
  },

  // ✅ GET /recipes?id=...
  async getById(ctx: Context) {
    const id = ctx.request.url.searchParams.get("id");
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID requis" };
      return;
    }

    ctx.response.body = await RecipeService.getById(id);
  },

  // ✅ POST /recipes
  async create(ctx: Context) {
    try {
      const body = await ctx.request.body.json();

      // 📥 Validation du corps de requête avec Zod
      const parsed = RecipeSchema.safeParse(body);
      if (!parsed.success) {
        ctx.response.status = 400;
        ctx.response.body = parsed.error;
        return;
      }

      // 🔁 Vérification d’un doublon de titre
      const existingRecipe = await RecipeService.getByTitle(parsed.data.title);
      if (existingRecipe) {
        ctx.response.status = 409;
        ctx.response.body = { error: "Cette recette existe déjà." };
        return;
      }

      // 🧠 Traitement des ingrédients (création ou récupération par nom)
      const processedIngredients = await Promise.all(
        parsed.data.ingredients.map(
          async (ingredient: { ingredientName?: string; ingredientId?: string; quantity: string }) => {
            if (ingredient.ingredientName) {
              let existing = (await IngredientService.getAll()).find(i => i.name === ingredient.ingredientName);
              if (!existing) {
                existing = await IngredientService.create(ingredient.ingredientName);
              }
              return {
                ingredientId: new ObjectId(existing._id),
                quantity: String(ingredient.quantity),
              };
            } else if (ingredient.ingredientId) {
              return {
                ingredientId: new ObjectId(ingredient.ingredientId),
                quantity: String(ingredient.quantity),
              };
            } else {
              throw new Error("Chaque ingrédient doit avoir soit 'ingredientId' soit 'ingredientName'.");
            }
          }
        )
      );

      // 🏗️ Construction de la recette avec métadonnées
      const recipeWithMeta = {
        ...parsed.data,
        _id: new ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredients: processedIngredients,
      };

      // 💾 Création en base
      const createdRecipe = await RecipeService.create(recipeWithMeta);
      ctx.response.body = createdRecipe;

    } catch (error) {
      console.error("Erreur lors de la création de la recette :", error);

      // 🔥 Gestion d'erreur propre
      if (error instanceof Error && error.message.includes("existe déjà")) {
        ctx.response.status = 409;
        ctx.response.body = { error: "Cette recette existe déjà." };
      } else if (error instanceof Error) {
        ctx.response.status = 500;
        ctx.response.body = { error: "Erreur interne du serveur", details: error.message };
      }
    }
  },

  // ✅ PUT /recipes?id=...
  async update(ctx: Context) {
    const id = ctx.request.url.searchParams.get("id");
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID requis" };
      return;
    }

    try {
      const body = await ctx.request.body.json();
      const parsed = RecipeSchema.partial().safeParse(body);

      if (!parsed.success) {
        ctx.response.status = 400;
        ctx.response.body = parsed.error;
        return;
      }

      // 🔁 Appel du service qui gère tout et retourne la recette mise à jour
      const updatedRecipe = await RecipeService.update(id, parsed.data);

      if (!updatedRecipe) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Recette non trouvée" };
        return;
      }

      ctx.response.body = {
        message: "Recette mise à jour.",
        recipe: updatedRecipe,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      ctx.response.status = 500;
      ctx.response.body = {
        error: "Erreur interne du serveur",
        details: (error as Error).message,
      };
    }
  },

  // ✅ DELETE /recipes?id=...
  async delete(ctx: Context) {
    const id = ctx.request.url.searchParams.get("id");
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID requis" };
      return;
    }

    await RecipeService.delete(id);
    ctx.response.body = { message: "Recette supprimée." };
  },
};
