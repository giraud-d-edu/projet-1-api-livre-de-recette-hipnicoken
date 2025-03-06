export interface Ingredient {
    _id?: string; // String pour éviter la manipulation directe des ObjectId
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  