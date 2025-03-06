import { MongoClient, dotenv } from "../deps.ts";

dotenv.config();

const client = new MongoClient();
await client.connect(Deno.env.get("MONGO_URI")!);
const db = client.database(Deno.env.get("DB_NAME")!);

export default db;
