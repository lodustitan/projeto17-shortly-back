import verifyToken from "../services/verifyToken.js"
import verifySchema from "../services/verifySchema.js";
import Joi from "joi";

import {
    dbCreateShortenUrl,
    dbGetAccountByEmail,
    dbGetShortenUrlById,
    dbGetShortenUrlByShorten,
    dbDeleteShortenUrlById
} from "../database/repository.js"

export async function addShortUrl(req, res){
    const schema = Joi.object().keys({
        url: Joi.string().uri().required()
    })
    const token = verifyToken(req.headers.authorization, res);
    const verify = verifySchema(schema, req.body);
    if(verify){
        return res.status(422).send(verify);
    }

    const {url} = req.body;

    try {
        if(token){
            const account = await dbGetAccountByEmail(token.jsonwebtoken.email);
            const shortUrl = await dbCreateShortenUrl(account.id, url)

            if(!shortUrl) throw new Error();
            return res.status(201).send(shortUrl);
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        return res.sendStatus(409);
    }

}
export async function getUrlById(req, res){
    const schema = Joi.object().keys({
        id: Joi.number().required()
    })

    const verify = verifySchema(schema, req.params);
    if(verify){
        return res.status(422).send(verify);
    }

    const {id} = req.params;
    
    try {
        const short = await dbGetShortenUrlById(id);
        if(short) return res.status(200).send({id: short.id, url: short.url, shortUrl: short.shortUrl});
        else throw new Error();
    } catch (error) {
        return res.sendStatus(404);
    }
}
export async function openShortUrl(req, res){
    const schema = Joi.object().keys({
        shortUrl: Joi.string().required()
    })

    const verify = verifySchema(schema, req.params);
    if(verify){
        return res.status(422).send(verify);
    }

    const {shortUrl} = req.params;

    try {
        const short = await dbGetShortenUrlByShorten(shortUrl);
        res.redirect(short.url)
    } catch (error) {
        return res.sendStatus(404);
    }

}
export async function deleteShortUrl(req, res){
    const schema = Joi.object().keys({
        id: Joi.number().required()
    })
    const token = verifyToken(req.headers.authorization, res);
    const verify = verifySchema(schema, req.params);
    if(verify){
        return res.status(422).send(verify);
    }

    const {id} = req.params;

    try {
        if(token){
            const account = await dbGetAccountByEmail(token.jsonwebtoken.email, token.jsonwebtoken.password);
            const deleted= await dbDeleteShortenUrlById(account.id, id);
            if(deleted) return res.status(201).send("short url deleted");
            else throw new Error("");
        }
    } catch (error) {
            return res.sendStatus(401);
    }
}