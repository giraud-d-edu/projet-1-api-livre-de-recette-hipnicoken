import { db } from "../db.ts";
import { RecipeDBO } from "../models/dbo/recipe.dbo.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

const recipesCollection = db.collection<RecipeDBO>("recipes");

export const findAllRecipes = async (): Promise<RecipeDBO[]> => {
  return await recipesCollection.find().toArray();
};

export const findRecipeById = async (id: string): Promise<RecipeDBO | null> => {
  return await recipesCollection.findOne({ _id: new ObjectId(id) });
};

export const findRecipesByName = async (name: string): Promise<RecipeDBO[]> => {
  return await recipesCollection.find({ name: { $regex: name, $options: "i" } }).toArray();
};

export const createRecipe = async (recipe: RecipeDBO): Promise<void> => {
  await recipesCollection.insertOne(recipe);
};

export const updateRecipe = async (id: string, recipe: Partial<RecipeDBO>): Promise<number> => {
  const { matchedCount } = await recipesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: recipe }
  );
  return matchedCount;
};

export const deleteRecipe = async (id: string): Promise<number> => {
  const { deletedCount } = await recipesCollection.deleteOne({ _id: new ObjectId(id) });
  return deletedCount;
};