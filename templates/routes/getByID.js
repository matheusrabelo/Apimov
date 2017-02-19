export default (app) => {
    let Resource = app.config.resource.name;
    let action = app.database.methods.getByID;

return {
    'file': `getByID${Resource}.js`,
    'route': 'getByID',
    'method': 'get',
    'path': `${Resource}/:id`,
    'source': `"use strict";

import ${Resource} from "../database/model";

export default function getByID${Resource}(req, res){
    ${action}
};
`};
};
