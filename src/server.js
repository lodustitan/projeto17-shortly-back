import route_auth from "./routes/route.auth.js";
import route_rank from "./routes/route.rank.js";
import route_url from "./routes/route.urls.js";
import route_users from "./routes/route.users.js";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(route_auth);
app.use(route_rank);
app.use(route_url);
app.use(route_users);

app.listen(4000);