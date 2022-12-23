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
export async function dbLoginAccount(email){
    try {
        const query = await db.query(`
            SELECT * 
            FROM accounts 
            WHERE email=$1;
        `, [email]); 
        
        
        return query.rows[0].password;
    } catch(err) {
        return false;
    }
}
export async function dbGetAccountByEmail(email){
    try {
        const query = await db.query(`
            SELECT * 
            FROM accounts 
            WHERE email=$1;
        `, [email]); 
        
        return query.rows[0];
        
    } catch(err) {
        return false;
    }
}
export async function dbCreateShortenUrl(owner_id, url){
    const short_url = nanoid(8);
    try {
        await db.query(`
            INSERT INTO urls 
                (owner_id, url, "shortUrl", "visitCount")
            VALUES
                ($1, $2, $3, 0);
        `, [owner_id, url, short_url]);    
        return {shortUrl: short_url};
    } catch(err) {
        return false;
    }
}
export async function dbGetShortenUrlById(id){
    try {
        const query = await db.query(`
            SELECT *
            FROM urls 
            WHERE id=$1;
        `, [id]);    
        return query.rows[0];
    } catch(err) {
        return false;
    }
}
export async function dbGetShortenUrlByShorten(shorten){
    try {
        const query = await db.query(`
            SELECT *
            FROM urls 
            WHERE "shortUrl"=$1;
        `, [shorten]);    

        await db.query(`
            UPDATE urls 
            SET "visitCount" = "visitCount"+1
            WHERE "shortUrl"=$1;
        `, [shorten]);  

        return query.rows[0];
    } catch(err) {
        return false;
    }
}
export async function dbDeleteShortenUrlById(owner_id, url_id){
    try {
        const query = await db.query(`
            DELETE FROM urls WHERE (
                id=$1 AND owner_id=$2
            );
        `, [url_id, owner_id]);    
        
        if(query.rowCount === 0) throw new Error();
        
        return true;
    } catch(err) {
        return false;
    }
}
export async function getAllLinkFromAccount(owner_id){
    try {
        const query = await db.query(`
            SELECT
                id,
                name
            FROM accounts
            WHERE
                id=$1
        `, [owner_id]);

        const userQuery = await db.query(`
            SELECT
                SUM("visitCount")
            FROM 
                urls
            WHERE
                owner_id=$1
            GROUP BY
                owner_id;
        `, [owner_id]);

        const allUrls = await db.query(`
            SELECT 
                id, "shortUrl", url, "visitCount"
            FROM urls
            WHERE owner_id=$1;
        `, [owner_id]);

        const visitCount = (userQuery.rows[0])? userQuery.rows[0].sum: 0;
        const obj = {
            id: query.rows[0].id,
            name: query.rows[0].name,
            visitCount: visitCount,
            shortenedUrls: allUrls.rows,
        }

        return obj;
    } catch (err) {
        console.log(err);
        return false;
    }
}
export async function dbGetRank(){
    try {
        const query = await db.query(`
            SELECT 
                urls.owner_id AS id,
                accounts.name,
                COUNT(urls.owner_id) AS "linksCount",
                SUM(urls."visitCount") AS "visitCount"
            FROM 
                accounts
            JOIN 
                urls
            ON 
                accounts.id = urls.owner_id
            GROUP BY
                accounts.name, urls.owner_id
            ORDER BY
                "visitCount" DESC, "linksCount" DESC
            LIMIT 10;  
        `);

        return query.rows;
    } catch(err) {
        return [];
    }
}