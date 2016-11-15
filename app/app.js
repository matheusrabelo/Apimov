"use strict";

import fs from "fs";

import SequelizeModel from "../templates/sequelize/model";
import SequelizeMysql from "../templates/sequelize/mysql";
import Routes from "../templates/routes/routes";
import Router from "../templates/app/router";


export default class App{

    constructor(config){
        this.config = config;
    }

    buildDatabase(){
        const { resource } = this.config;
        if(this.config.database == "mysql"){
            this.model = SequelizeModel(resource, "mySQL", this.config.properties);
            this.database = SequelizeMysql(resource);
        }
    }

    buildRoutes(){
        const { routes, resource } = this.config;
        this.routes = new Array();
        if(routes != undefined){
            routes.forEach(route => {
                this.routes.push(
                    Routes(resource, route.method, route.action, route.additional)
                );
            });
        }
    }

    buildRouter(){
        const { routes, middlewares, resource } = this.config;
        if(middlewares != undefined && routes != undefined){
            this.router = Router(resource, routes, middlewares);
        }
    }

    build() {
        const { src, resource } = this.config;
        if(src == undefined) throw Error("Destination folder not found");
        if(resource == undefined) throw Error("Resource not found");
        this.buildDatabase();
        this.buildRoutes();
        this.buildRouter();
    }

}