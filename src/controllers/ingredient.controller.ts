import { IngredientService } from "../services/ingredient.service.ts";
import { IngredientSchema } from "../models/dto/ingredient.dto.ts";
import { Context } from "../../deps.ts";

export const IngredientController = {
  async getAll(ctx: Context) {
    try {
      ctx.response.body = await IngredientService.getAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des ingrédients :", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur interne du serveur", details: (error as Error).message };
    }
  },

  async getById(ctx: Context) {
    try {
      const id = ctx.request.url.searchParams.get("id");
      if (!id) {
        ctx.response.status = 400;
        ctx.response.body = { error: "ID requis" };
        return;
      }

      const ingredient = await IngredientService.getById(id);
      if (!ingredient) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Ingrédient non trouvé." };
        return;
      }

      ctx.response.body = ingredient;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ingrédient :", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur interne du serveur", details: (error as Error).message };
    }
  },

  async create(ctx: Context) {
    try {
      const body = await ctx.request.body.json();

      const parsed = IngredientSchema.safeParse(body);
      if (!parsed.success) {
        ctx.response.status = 400;
        ctx.response.body = parsed.error;
        return;
      }

      // Vérifier si l'ingrédient existe déjà
      const existing = await IngredientService.getByName(parsed.data.name);
      if (existing) {
        ctx.response.status = 409; // Conflict
        ctx.response.body = { error: "Cet ingrédient existe déjà." };
        return;
      }

      const ingredient = await IngredientService.create(parsed.data.name);
      ctx.response.status = 201; // Created
      ctx.response.body = ingredient;
    } catch (error) {
      console.error("Erreur lors de la création de l'ingrédient :", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur interne du serveur", details: (error as Error).message };
    }
  },

  async delete(ctx: Context) {
    try {
      const id = ctx.request.url.searchParams.get("id");
      if (!id) {
        ctx.response.status = 400;
        ctx.response.body = { error: "ID requis" };
        return;
      }

      // Vérifier si l'ingrédient existe avant suppression
      const ingredient = await IngredientService.getById(id);
      if (!ingredient) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Ingrédient non trouvé." };
        return;
      }

      // Vérifier si l'ingrédient est utilisé dans une recette
      const isUsed = await IngredientService.isIngredientUsed(id);
      if (isUsed) {
        ctx.response.status = 409; // Conflict
        ctx.response.body = { error: "Impossible de supprimer cet ingrédient, il est utilisé dans des recettes." };
        return;
      }

      await IngredientService.delete(id);
      ctx.response.body = { message: "Ingrédient supprimé avec succès." };
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ingrédient :", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur interne du serveur", details: (error as Error).message };
    }
  },
};
