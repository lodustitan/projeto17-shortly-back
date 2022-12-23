import { 
    getAllLinkFromAccount,
    dbGetAccountByEmail
} from "../database/repository.js";
import verifyToken from "../services/verifyToken.js";

export async function getMeUser(req, res){
    
    const token = verifyToken(req.headers.authorization);

    if(token){
        const account = await dbGetAccountByEmail(token.jsonwebtoken.email);
        const infos = await getAllLinkFromAccount(account.id)
        return res.status(200).send(infos);
    } else {
        return res.sendStatus(401);
    }
}