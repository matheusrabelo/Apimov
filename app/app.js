"use strict";

import fs from "fs";

import Databases from "../templates/databases";
import Routes from "../templates/routes";
import Router from "../templates/app/router";
import Middlewares from "../templates/middlewares";


export default class App{

    constructor(config){
        this.config = config;
    }

    buildDatabase(){
        const { database } = this.config;
        if(database != undefined){
          try{
            this.database = Databases[database](this);
          }
          catch(e){
            console.log(`Database: ${database} mising in library`);
          }
        }
    }

    buildRoutes(){
        const { routes, resource } = this.config;
        this.routes = new Array();
        if(routes != undefined){
            routes.forEach(route => {
              try{
                this.routes.push(Routes[route](this));
              }
              catch(e){
                console.log(`Routes: ${route} mising in library`);
              }
            });
        }
    }

    buildRouter(){
        const { middlewares } = this.config;
        this.middlewares = new Array();
        if(middlewares != undefined){
            middlewares.forEach(middleware => {
              try{
                this.middlewares.push(Middlewares[middleware](this));
              }
              catch(e){
                console.log(`Middleware: ${middleware} mising in library`);
              }
            });
        }
        this.router = Router(this);
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
