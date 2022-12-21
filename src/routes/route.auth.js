import { Router } from "express";
import { signUp, signIn } from "../controller/controller.auth.js";

const route = Router();

route.post("/signup", signUp);
route.post("/signin", signIn);

export default route;