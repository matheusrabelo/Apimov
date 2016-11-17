export default (app) => {
    
    let Resource = app.config.resource;
    let action = app.database.methods.get;

return {
    "route": "get",
    "method": "get",
    "path": `${Resource}`,
    "code": `
"use strict";

import ${Resource} from "../database/model";

export default function get${Resource}(req, res){
    ${action}
};
`};

};