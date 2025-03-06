import { IngredientService } from "../services/ingredient.service.ts";
import { IngredientSchema } from "../models/dto/ingredient.dto.ts";
import { Context } from "../../deps.ts";

export const IngredientController = {
  async getAll(ctx: Context) {
    ctx.response.body = await IngredientService.getAll();
  },

  async getById(ctx: Context) {
    const id = ctx.request.url.searchParams.get("id");
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID requis" };
      return;
    }

    ctx.response.body = await IngredientService.getById(id);
  },

  async create(ctx: Context) {
    const body = await ctx.request.body.json(); 

    const parsed = IngredientSchema.safeParse(body);
    if (!parsed.success) {
      ctx.response.status = 400;
      ctx.response.body = parsed.error;
      return;
    }

    ctx.response.body = await IngredientService.create(parsed.data.name);
  },

  async delete(ctx: Context) {
    const id = ctx.request.url.searchParams.get("id");
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID requis" };
      return;
    }

    await IngredientService.delete(id);
    ctx.response.body = { message: "Ingrédient supprimé." };
  },
};
