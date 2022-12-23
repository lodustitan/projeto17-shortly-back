import { 
    dbGetRank
} from "../database/repository.js";

export async function ranking(req, res){
    const query = await dbGetRank();

    return res.status(200).send(query);
}