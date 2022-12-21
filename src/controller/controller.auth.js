import jwt from "jsonwebtoken";
import Joi from "joi";
import { 
    dbCreateAccount, 
    dbCreateShortenUrl,
    dbLoginAccount 
} from "../database/repository.js";

const privateKey = "23HH42K";

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
    const query = await dbCreateAccount(name, email, password);

    if(query){
        return res.status(201).send("Criado");
    }else{
        return res.sendStatus(409);
    }

}
export async function signIn(req, res){

    const schema = Joi.object().keys({
        email: Joi.string().required(), 
        password: Joi.string().required()
    });

    const validation = schema.validate(req.body, {abortEarly: false});

    if (validation.error) {
        const messages = validation.error.details.map(details => details.message);
        return res.status(422).send(messages);
    }

    const { email, password } = req.body;
    const query = await dbLoginAccount(email, password);
    
    const token = jwt.sign(req.body, privateKey, {expiresIn: '1h'});
    
    if(query){
        return res.status(201).send({token: `Bearer ${token}`});
    }else{
        return res.sendStatus(400);
    }

}