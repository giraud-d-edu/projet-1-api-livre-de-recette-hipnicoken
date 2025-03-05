import { db } from "../db.ts";
import { IngredientDBO } from "../models/dbo/ingredient.dbo.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

const ingredientsCollection = db.collection<IngredientDBO>("ingredients");

export const findAllIngredients = async (): Promise<IngredientDBO[]> => {
  return await ingredientsCollection.find().toArray();
};

export const findIngredientById = async (id: string): Promise<IngredientDBO | null> => {
  return await ingredientsCollection.findOne({ _id: new ObjectId(id) });
};

export const createIngredient = async (ingredient: IngredientDBO): Promise<void> => {
  await ingredientsCollection.insertOne(ingredient);
};

export const updateIngredient = async (id: string, ingredient: Partial<IngredientDBO>): Promise<number> => {
  const { matchedCount } = await ingredientsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: ingredient }
  );
  return matchedCount;
};

export const deleteIngredient = async (id: string): Promise<number> => {
  const { deletedCount } = await ingredientsCollection.deleteOne({ _id: new ObjectId(id) });
  return deletedCount;
};