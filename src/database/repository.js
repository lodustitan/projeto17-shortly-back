import db from "./database.js";
import { nanoid } from "nanoid";

export async function dbCreateAccount(name, email, password){
    try {
        await db.query(`
            INSERT INTO accounts 
                (name, email, password)
            VALUES
                ($1, $2, $3);
        `, [name, email, password]);    
        return true;
    } catch(err) {
        return false;
    }
}
export async function dbLoginAccount(email, password){
    try {
        const query = await db.query(`
            SELECT * 
            FROM accounts 
            WHERE email=$1;
        `, [email]); 
        
        if(query.rows[0].password === password) return true;
        
    } catch(err) {
        console.log(email, password);
        return false;
    }
}
export async function dbCreateShortenUrl(owner_id, url, short_url, visit_count){
    const id = nanoid(12);
    try {
        await db.query(`
            INSERT INTO urls 
                (owner_id, url, "shortUrl", "visitCount")
            VALUES
                ($1, $2, $3);
        `, [owner_id, url, short_url, visit_count]);    

    } catch(err) {
        return false;
    }
}