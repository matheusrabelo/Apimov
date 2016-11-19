export default {
    "file": "index.js",
    "source": `'use strict';

import app from "./app/app";
import configuration from "./configuration";

const port = process.env.PORT || configuration.port;

app.listen(port, console.log("listening on " + port));
`};
