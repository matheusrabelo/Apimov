import getRoute from "./get";
import getByIDRoute from "./getByID";
import postRoute from "./post";
import deleteRoute from "./delete";

export default {
    "get": getRoute, 
    "getByID": getByIDRoute, 
    "post": postRoute, 
    "delete": deleteRoute
};