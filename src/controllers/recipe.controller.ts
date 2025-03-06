import { RecipeService } from "../services/recipe.service.ts";
import { RecipeSchema } from "../models/dto/recipe.dto.ts";
import { Context } from "../../deps.ts";
import { ObjectId } from "../../deps.ts";

export const RecipeController = {
  async getAll(ctx: Context) {
    ctx.response.body = await RecipeService.getAll();
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
      })),
    };

    ctx.response.body = await RecipeService.create(recipeWithMeta);
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
