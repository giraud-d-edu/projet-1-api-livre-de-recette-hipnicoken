import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import {
  findAllRecipes,
  findRecipeById,
  findRecipesByName,
  createRecipe as createRecipeRepo,
  updateRecipe as updateRecipeRepo,
  deleteRecipe as deleteRecipeRepo,
} from "../repository/recipe.repository.ts";
import { RecipeDBO } from "../models/dbo/recipe.dbo.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

export const getRecipes = async (context: RouterContext) => {
  const { name } = context.request.url.searchParams;
  const recipes = name ? await findRecipesByName(name) : await findAllRecipes();
  context.response.body = recipes;
};

export const getRecipe = async (context: RouterContext) => {
  const { id } = context.params;
  const recipe = await findRecipeById(id);
  if (recipe) {
    context.response.body = recipe;
  } else {
    context.response.status = 404;
    context.response.body = { message: "Recipe not found" };
  }
};

export const createRecipe = async (context: RouterContext) => {
  const body = await context.request.body.json()
  const newRecipe: RecipeDBO = {
    _id: new ObjectId(),
    ...body,
  };
  await createRecipeRepo(newRecipe);
  context.response.status = 201;
  context.response.body = newRecipe;
};

export const updateRecipe = async (context: RouterContext) => {
  const { id } = context.params;
  const body = await context.request.body.json()
  const matchedCount = await updateRecipeRepo(id, body);
  if (matchedCount) {
    context.response.body = { message: "Recipe updated" };
  } else {
    context.response.status = 404;
    context.response.body = { message: "Recipe not found" };
  }
};

export const deleteRecipe = async (context: RouterContext) => {
  const { id } = context.params;
  const deletedCount = await deleteRecipeRepo(id);
  if (deletedCount) {
    context.response.body = { message: "Recipe deleted" };
  } else {
    context.response.status = 404;
    context.response.body = { message: "Recipe not found" };
  }
};