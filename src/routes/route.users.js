import { Router } from "express";
import { 
    getMeUser 
} from "../controller/controller.users.js";

const route = Router();

route.get("/users/me", getMeUser);

export default route;