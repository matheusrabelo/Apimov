"use strict";

import fs from "fs";

import SequelizeModel from "../templates/sequelize/model";
import SequelizeMysql from "../templates/sequelize/mysql";


export default class App{

    constructor(config){
        this.config = config;
    }

    build() {
        const {src, resource} = this.config;
        if(src == undefined) throw Error("Destination folder not found");
        if(resource == undefined) throw Error("Resource not found");
        if(this.config.database == "mysql"){
            this.model = SequelizeModel(resource, "mySQL", this.config.properties);
            this.database = SequelizeMysql(resource);
        }
    }

}