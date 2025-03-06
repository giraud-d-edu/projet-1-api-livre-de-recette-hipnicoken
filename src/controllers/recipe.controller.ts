import { RecipeService } from "../services/recipe.service.ts";
import { RecipeSchema } from "../models/dto/recipe.dto.ts";
import { Context } from "../../deps.ts";
import { ObjectId } from "../../deps.ts";

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
    } else if (params.has("ingredient")) {
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

    const recipeWithMeta = {
      ...parsed.data,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ingredients: parsed.data.ingredients.map((ingredient: { ingredientId: string; quantity: string }) => ({
        ...ingredient,
        ingredientId: new ObjectId(ingredient.ingredientId),
        quantity: Number(ingredient.quantity),
      })),
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
      ingredients: parsed.data.ingredients?.map((ingredient: { ingredientId: string; quantity: string }) => ({
        ...ingredient,
        ingredientId: new ObjectId(ingredient.ingredientId),
        quantity: Number(ingredient.quantity),
      })),
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
