export default (app) => {
    
    let Resource = app.config.resource;
    let action = app.database.methods.getByID;

return {
    "route": "getByID",
    "method": "get",
    "path": `${Resource}/:id`,
    "code": `"use strict";

import ${Resource} from "../database/model";

export default function getByID${Resource}(req, res){
    ${action}
};
`};

};