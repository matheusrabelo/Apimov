export default (Resource, Routes, Middlewares) => {

return `
"use strict";

import express from "express";
import bodyParser from "body-parser";
${importMiddlewares(Middlewares)}
${importRoutes(Resource, Routes)}

let router = express.Router();

router.use(bodyParser.json());
${useMiddlewares(Middlewares)}

${routerRoutes(Resource, Routes)}

export default router;
`;

};

function importRoutes(Resource, Routes){
    let importString = "";
    Routes.forEach(route => {
        importString += `import ${route.method.toLowerCase()}${Resource} from "../routes/${route.method.toLowerCase()}${Resource}${route.additional}";
`;
    });
    return importString;
}

function routerRoutes(Resource, Routes){
    let routerString = "";
    Routes.forEach(route => {
        routerString += `router.${route.method.toLowerCase()}("${route.path}", ${route.method.toLowerCase()}${Resource}${route.additional});
`;
    });
    return routerString;
}

function useMiddlewares(Middlewares){
    let useString = "";
    Middlewares.forEach(middleware => {
        if(middleware.additional != undefined){
            useString += `${middleware.additional}
`;
        }
        useString += `router.use(${middleware.use});
`;
    })
    return useString;
}

function importMiddlewares(Middlewares){
    let importString = "";
    Middlewares.forEach(middleware => {
        importString += `import ${middleware.name} from "${middleware.from}";
`;
    });
    return importString;
}
