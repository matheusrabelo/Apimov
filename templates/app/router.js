export default (app) => {

    let router =  `
"use strict";

import express from "express";
import bodyParser from "body-parser";
`;

    app.middlewares.forEach(middleware => {
        router += `import ${middleware.import} from "${middleware.import}";\n`;
    });

    router += `\n`;

    app.routes.forEach(route => {
        router += `import ${route.route}${app.config.resource} from "../routes/${route.route.toLowerCase()}${app.config.resource}";\n`;
    });

    router += `\nlet router = express.Router();\n`;
    router += `router.use(bodyParser.json());\n`;

    app.middlewares.forEach(middleware => {
        if(middleware.additional != undefined) router += middleware.additional + "\n";
        router += `router.use(${middleware.use});\n`;
    });

    router += `\n`;

    app.routes.forEach(route => {
        router += `router.${route.method.toLowerCase()}("/${route.path}", ${route.route.toLowerCase()}${app.config.resource});\n`;
    });

    router += `\nexport default router;`;

    return router;

};