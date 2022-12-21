import { Router } from "express";
import { 
    getMeUser 
} from "../controller/controller.users.js";

const route = Router();

route.post("/users/me");

export default route;