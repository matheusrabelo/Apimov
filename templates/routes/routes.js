export default (app, route) => {
    
    let Resource = app.config.resource;
    let {method, action, additional} = route;

return `
"use strict";

import ${Resource} from "../database/model";

export default function ${method.toLowerCase()}${Resource}${additional}(req, res){
    ${action}
};
`;

};