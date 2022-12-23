import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

let db;

try {
    db = new Pool({connectionString: process.env.DATABASE_URL});
} catch (error) {
    console.error(error);
}

export default db;