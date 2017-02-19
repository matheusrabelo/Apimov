export default (app) => {
    let router = `
"use strict";

import express from "express";
import bodyParser from "body-parser";
`;

    app.api.middlewares.forEach((middleware) => {
        router += `import ${middleware.import} from "${middleware.import}";\n`;
    });

    router += `\n`;

    app.api.routes.forEach((route) => {
        /* eslint-disable max-len */
        router += `import ${route.route}${app.config.resource.name} from "../routes/${route.route}${app.config.resource.name}";\n`;
    });

    router += `\nlet router = express.Router();\n`;
    router += `router.use(bodyParser.json());\n`;

    app.api.middlewares.forEach((middleware) => {
        if(middleware.additional) router += middleware.additional + '\n';
        router += `router.use(${middleware.use});\n`;
    });

    router += `\n`;

    app.api.routes.forEach((route) => {
        /* eslint-disable max-len */
        router += `router.${route.method}("/${route.path}", ${route.route}${app.config.resource.name});\n`;
    });

    router += `\nexport default router;`;

    return {
        'file': 'router.js',
        'source': router,
    };
};
