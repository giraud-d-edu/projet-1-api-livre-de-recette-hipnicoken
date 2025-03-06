import { MongoClient, dotenv } from "../deps.ts";

// Charger les variables d'environnement
dotenv.config();

const MONGO_URI = Deno.env.get("MONGO_URI");
const DB_NAME = Deno.env.get("DB_NAME");

if (!MONGO_URI || !DB_NAME) {
  throw new Error("❌ ERREUR : Les variables d'environnement MONGO_URI et DB_NAME sont obligatoires.");
}

// Initialisation du client MongoDB
const client = new MongoClient();
await client.connect(MONGO_URI);

console.log(`✅ Connecté à MongoDB : ${MONGO_URI}`);

// Sélection de la base de données
const db = client.database(DB_NAME);

export default db;
