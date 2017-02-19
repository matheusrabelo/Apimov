export default (app) => {
    
    let Resource = app.config.resource.name;
    let action = app.database.methods.get;

return {
    "file": `get${Resource}.js`,
    "route": "get",
    "method": "get",
    "path": `${Resource}`,
    "source": `
"use strict";

import ${Resource} from "../database/model";

export default function get${Resource}(req, res){
    ${action}
};
`};

};