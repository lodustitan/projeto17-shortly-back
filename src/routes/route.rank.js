import { Router } from "express";
import { 
    ranking 
} from "../controller/controller.rank.js";

const route = Router();

route.post("/ranking");

export default route;