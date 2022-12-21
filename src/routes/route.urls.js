import { Router } from "express";
import { 
    addShortUrl, 
    getUrlById, 
    openShortUrl, 
    deleteShortUrl 
} from "../controller/controller.urls.js";

const route = Router();

route.post("/urls/shorten");
route.get("/urls/:id");
route.get("/urls/open/:shortUrl");
route.delete("/urls/:id");

export default route;