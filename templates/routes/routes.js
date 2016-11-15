export default (Resource, Method, Action, Additional) => {

    let method = Method.toLowerCase();

return `
"use strict";

import ${Resource} from "../database/model";

export default function ${method}${Resource}${Additional}(req, res){
    ${Action}
};
`;

};