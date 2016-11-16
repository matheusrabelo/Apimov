export default (app) => {
    
    let Resource = app.config.resource;
    let action = app.database.methods.create;

return {
    "route": "post",
    "method": "post",
    "path": `${Resource}`,
    "code": `"use strict";

import ${Resource} from "../database/model";

export default function post${Resource}(req, res){
    ${action}
};
`};

};