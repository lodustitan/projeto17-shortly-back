import { Router } from "express";
import { 
    addShortUrl, 
    getUrlById, 
    openShortUrl, 
    deleteShortUrl 
} from "../controller/controller.urls.js";

const route = Router();

route.post("/urls/shorten", addShortUrl);
route.get("/urls/:id", getUrlById);
route.get("/urls/open/:shortUrl", openShortUrl);
route.delete("/urls/:id", deleteShortUrl);

export default route;