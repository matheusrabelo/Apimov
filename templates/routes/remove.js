export default (app) => {
    
    let Resource = app.config.resource;
    let action = app.database.methods.remove;

return {
    "route": "remove",
    "method": "delete",
    "path": `${Resource}/:id`,
    "code": `"use strict";

import ${Resource} from "../database/model";

export default function remove${Resource}(req, res){
    ${action}
};
`};

};