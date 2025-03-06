import { RecipeService } from "../services/recipe.service.ts";
import { RecipeSchema } from "../models/dto/recipe.dto.ts";
import { Context } from "../../deps.ts";
import { ObjectId } from "../../deps.ts";
import { IngredientService } from "../services/ingredient.service.ts";

export const RecipeController = {
  async getAll(ctx: Context) {
    const params = ctx.request.url.searchParams;

    if (params.has("id")) {
      const id = params.get("id");
      if (id) {
        ctx.response.body = await RecipeService.getById(id);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "ID requis" };
      }
    } else if (params.has("title")) {
      const title = params.get("title");
      if (title) {
        ctx.response.body = await RecipeService.getByTitle(title);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "Title requis" };
      }
    } else if (params.has("category")) {
      const category = params.get("category");
      if (category) {
        ctx.response.body = await RecipeService.getByCategory(category);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "Category requis" };
      }
    } else if (params.has("ingredientName")) {
      // Recherche par nom d'ingrédient
      const ingredientName = params.get("ingredientName");
      if (ingredientName) {
        ctx.response.body = await RecipeService.getByIngredientName(ingredientName);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "Ingredient name requis" };
      }
    } else if (params.has("ingredient")) {
      // Recherche par id d'ingrédient
      const ingredient = params.get("ingredient");
      if (ingredient) {
        ctx.response.body = await RecipeService.getByIngredient(ingredient);
      } else {
        ctx.response.status = 400;
        ctx.response.body = { error: "Ingredient requis" };
      }
    } else {
      ctx.response.body = await RecipeService.getAll();
    }
  },
  async getById(ctx: Context) {
    const id = ctx.request.url.searchParams.get("id");
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID requis" };
      return;
    }

    ctx.response.body = await RecipeService.getById(id);
  },


  async create(ctx: Context) {
    const body = await ctx.request.body.json();

    const parsed = RecipeSchema.safeParse(body);
    if (!parsed.success) {
      ctx.response.status = 400;
      ctx.response.body = parsed.error;
      return;
    }

    // Traiter chaque ingrédient en fonction de son nom ou de son id
    const processedIngredients = await Promise.all(
      parsed.data.ingredients.map(
        async (ingredient: { ingredientName?: string; ingredientId?: string; quantity: string }) => {
          if (ingredient.ingredientName) {
            // Rechercher par nom ou créer l'ingrédient s'il n'existe pas
            let existing = (await IngredientService.getAll()).find(i => i.name === ingredient.ingredientName);
            if (!existing) {
              existing = await IngredientService.create(ingredient.ingredientName);
            }
            return {
              ingredientId: new ObjectId(existing._id),
              quantity: Number(ingredient.quantity),
            };
          } else if (ingredient.ingredientId) {
            // Si l'id est déjà fourni, on le transforme en ObjectId
            return {
              ingredientId: new ObjectId(ingredient.ingredientId),
              quantity: Number(ingredient.quantity),
            };
          } else {
            throw new Error("Chaque ingrédient doit avoir soit 'ingredientId' soit 'ingredientName'.");
          }
        }
      )
    );

    const recipeWithMeta = {
      ...parsed.data,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ingredients: processedIngredients,
    };

    ctx.response.body = await RecipeService.create(recipeWithMeta);
  },

  async update(ctx: Context) {
    const id = ctx.request.url.searchParams.get("id");
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID requis" };
      return;
    }

    const body = await ctx.request.body.json();
    const parsed = RecipeSchema.partial().safeParse(body);
    if (!parsed.success) {
      ctx.response.status = 400;
      ctx.response.body = parsed.error;
      return;
    }

    const updatedData = {
      ...parsed.data,
      ingredients: parsed.data.ingredients?.map((ingredient) => {
        if (!ingredient.ingredientId) {
          throw new Error("Chaque ingrédient doit avoir un 'ingredientId'.");
        }
        return {
          ...ingredient,
          ingredientId: new ObjectId(ingredient.ingredientId),
          quantity: Number(ingredient.quantity),
        };
      }),
    };

    const updatedRecipe = await RecipeService.update(id, updatedData);
    if (!updatedRecipe) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Recette non trouvée" };
      return;
    }

    ctx.response.body = { message: "Recette mise à jour.", recipe: updatedRecipe };
  },

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
