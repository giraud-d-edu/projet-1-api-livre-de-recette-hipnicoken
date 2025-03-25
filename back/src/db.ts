import { MongoClient } from "npm:mongodb@6.1.0";
import { config } from "./config.ts"; // Vérifie que l'import est correct

export class MongoConnection {
    private static client: MongoClient;
    private static instance: MongoConnection;

    private constructor() {}

    public static async getInstance(): Promise<MongoConnection> {
        if (!MongoConnection.instance) {
            try {
                MongoConnection.instance = new MongoConnection();
                MongoConnection.client = new MongoClient(config.MONGO_URI);
                await MongoConnection.client.connect();
                console.log("✅ Successfully connected to MongoDB.");
            } catch (error) {
                console.error("❌ Failed to connect to MongoDB:", error);
                throw error;
            }
        }
        return MongoConnection.instance;
    }

    public getDb() {
        return MongoConnection.client.db(config.MONGO_DB_NAME);
    }

    public async closeConnection() {
        if (MongoConnection.client) {
            await MongoConnection.client.close();
            console.log("🔴 Connection to MongoDB closed.");
        }
    }
}

// ✅ Export correct
const mongoInstance = await MongoConnection.getInstance();
export const db = mongoInstance.getDb();
