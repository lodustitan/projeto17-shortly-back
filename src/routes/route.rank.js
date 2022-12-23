import { Router } from "express";
import { 
    ranking 
} from "../controller/controller.rank.js";

const route = Router();

route.get("/ranking", ranking);

export default route;