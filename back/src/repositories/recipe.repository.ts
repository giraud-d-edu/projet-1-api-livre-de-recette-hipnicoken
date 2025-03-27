import { db } from "../db.ts";
import { RecipeDBO } from "./dbo/recipe.dbo.ts";
import { ObjectId } from "../deps.ts";

// 📌 Référence à la collection MongoDB "recipes"
const collection = db.collection<Omit<RecipeDBO, "_id"> & { _id?: ObjectId }>("recipes");

export const RecipeRepository = {
  // ✅ Récupérer toutes les recettes avec filtres éventuels
  async findAll(filters: any = {}) {
    return await collection.find(filters).toArray();
  },

  // ✅ Récupérer une recette par son ID
  async findById(id: string) {
    try {
      const objectId = new ObjectId(id);
      return await collection.findOne({ _id: objectId });
    } catch (error) {
      console.error("Erreur lors de la conversion de l'ID en ObjectId:", error);
      return null;
    }
  },

  // ✅ Rechercher une recette par son titre exact
  async findByTitle(title: string) {
    return await collection.findOne({ title });
  },

  // ✅ Rechercher toutes les recettes par catégorie
  async findByCategory(category: string) {
    return await collection.find({ category }).toArray();
  },

  // ✅ Récupérer toutes les recettes qui utilisent un ingrédient (via son ID)
  async findByIngredient(ingredientId: string) {
    try {
      const objectId = new ObjectId(ingredientId);
      return await collection.find({
        ingredients: { $elemMatch: { ingredientId: objectId } }
      }).toArray();
    } catch (error) {
      console.error(`❌ Erreur lors de la recherche de recettes avec l'ID ingrédient ${ingredientId} :`, error);
      return [];
    }
  },

  // ✅ Insérer une nouvelle recette dans la base de données
  async insert(recipe: Omit<RecipeDBO, "_id" | "createdAt" | "updatedAt">) {
    const newRecipe: RecipeDBO = {
      ...recipe,
      _id: new ObjectId(), // Générer un nouvel ObjectId
      ingredients: recipe.ingredients.map((ing) => ({
        ingredientId: new ObjectId(ing.ingredientId),
        quantity: ing.quantity,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newRecipe);

    return { ...newRecipe, _id: newRecipe._id.toString() }; // Retourner l'ID sous forme de string
  },

  // ✅ Mettre à jour une recette existante
  // 🎯 C’est désormais le repository qui se charge de la conversion et du traitement final
  async update(id: string, data: Partial<Recipe>) {
    try {
      const objectId = new ObjectId(id);

      // 🧼 On enlève les champs qu'on ne veut pas modifier directement
      const { _id, createdAt, updatedAt, ...safeData } = data;

      // 🕓 Ajout automatique de la date de mise à jour
      const updateData: any = {
        ...safeData,
        updatedAt: new Date(),
      };

      // 🔄 Si on met à jour les ingrédients, on convertit leurs IDs
      if (safeData.ingredients) {
        updateData.ingredients = safeData.ingredients.map((ing) => ({
          ingredientId: new ObjectId(ing.ingredientId),
          quantity: Number(ing.quantity),
        }));
      }

      // 🔧 Mise à jour dans la base
      const result = await collection.updateOne(
        { _id: objectId },
        { $set: updateData }
      );
      return result;

    } catch (error) {
      console.error("Erreur update():", error);
      return null;
    }
  },

  // ✅ Supprimer une recette par ID
  async delete(id: string) {
    try {
      const objectId = new ObjectId(id);
      return await collection.deleteOne({ _id: objectId });
    } catch (error) {
      console.error("Erreur lors de la conversion de l'ID en ObjectId:", error);
      return null;
    }
  },
};
