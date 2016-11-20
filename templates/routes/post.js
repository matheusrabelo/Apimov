export default (app) => {
    
    let Resource = app.config.resource;
    let action = app.database.methods.post;

return {
    "file": `post${Resource}.js`,
    "route": "post",
    "method": "post",
    "path": `${Resource}`,
    "source": `"use strict";

import ${Resource} from "../database/model";

export default function post${Resource}(req, res){
    ${action}
};
`};

};