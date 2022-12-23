import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcrypt";
import { 
    dbCreateAccount, 
    dbLoginAccount 
} from "../database/repository.js";
import dotenv from "dotenv";
import verifySchema from "../services/verifySchema.js";

dotenv.config();

export async function signUp(req, res){

    const schema = Joi.object().keys({
        name: Joi.string().required(), 
        email: Joi.string().email().required(), 
        password: Joi.string().required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()
    });

    const validation = schema.validate(req.body, {abortEarly: false});

    if (validation.error) {
        const messages = validation.error.details.map(details => details.message);
        return res.status(422).send(messages);
    }

    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, async function(err, hash) {
        const query = await dbCreateAccount(name, email, hash);
        
        if(query){
            return res.status(201).send("Criado");
        }else{
            return res.sendStatus(409);
        }
    });

}
export async function signIn(req, res){

    const schema = Joi.object().keys({
        email: Joi.string().required(), 
        password: Joi.string().required()
    });

    const verify = verifySchema(schema, req.body);
    if(verify){
        return res.status(422).send(verify);
    }

    const { email, password } = req.body;
    const query = await dbLoginAccount(email);

    bcrypt.compare(password, query, function(err, result) {
        if(!result) return res.sendStatus(401);
        const token = jwt.sign(req.body, "23HH42K", {expiresIn: "1d"});
        
        if(query){
            return res.status(200).send({token: `Bearer ${token}`});
        }else{
            return res.sendStatus(401);
        }
    });
    

}