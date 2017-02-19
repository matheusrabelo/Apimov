export default (app) => {
    
    let Resource = app.config.resource.name;
    let action = app.database.methods.delete;

return {
    "file": `delete${Resource}.js`,
    "route": "delete",
    "method": "delete",
    "path": `${Resource}/:id`,
    "source": `"use strict";

import ${Resource} from "../database/model";

export default function delete${Resource}(req, res){
    ${action}
};
`};

};