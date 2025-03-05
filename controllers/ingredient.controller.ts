import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import {
  findAllIngredients,
  findIngredientById,
  createIngredient as createIngredientRepo,
  updateIngredient as updateIngredientRepo,
  deleteIngredient as deleteIngredientRepo,
} from "../repository/ingredient.repository.ts";
import { IngredientDBO } from "../models/dbo/ingredient.dbo.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

export const getIngredients = async (context: RouterContext) => {
  const ingredients = await findAllIngredients();
  context.response.body = ingredients;
};

export const getIngredient = async (context: RouterContext) => {
  const { id } = context.params;
  const ingredient = await findIngredientById(id);
  if (ingredient) {
    context.response.body = ingredient;
  } else {
    context.response.status = 404;
    context.response.body = { message: "Ingredient not found" };
  }
};

export const createIngredient = async (context: RouterContext) => {
  const body = await context.request.body.json()
  const newIngredient: IngredientDBO = {
    _id: new ObjectId(),
    ...body,
  };
  await createIngredientRepo(newIngredient);
  context.response.status = 201;
  context.response.body = newIngredient;
};

export const updateIngredient = async (context: RouterContext) => {
  const { id } = context.params;
  const body = await context.request.body.json()
  const matchedCount = await updateIngredientRepo(id, body);
  if (matchedCount) {
    context.response.body = { message: "Ingredient updated" };
  } else {
    context.response.status = 404;
    context.response.body = { message: "Ingredient not found" };
  }
};

export const deleteIngredient = async (context: RouterContext) => {
  const { id } = context.params;
  const deletedCount = await deleteIngredientRepo(id);
  if (deletedCount) {
    context.response.body = { message: "Ingredient deleted" };
  } else {
    context.response.status = 404;
    context.response.body = { message: "Ingredient not found" };
  }
};