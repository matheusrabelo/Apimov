export default `"use strict";

import express from "express";
import router from "./router";

let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(router);

export default app;
`;