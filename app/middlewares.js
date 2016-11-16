"use strict";

import fs from "fs";
import * as middlewaresTemplates from "../templates/middlewares/index.js"
//import SequelizeMysql from "../templates/middlewares/mysql";

export default function build(config) {
        const configMiddlewares = config.middlewares;
        if(configMiddlewares == undefined) throw Error("Middlewares not found in configuration");

        let middlewares = [];
        let middlewareFunction;
        
        configMiddlewares.forEach((item) => {
          try {
            middlewareFunction = middlewaresTemplates[`${item}`];
            if(middlewareFunction == undefined) throw Error("Missing");
            middlewares.push(middlewareFunction);
          }
          catch(e){
            //TODO: Gerar ferramenta que logue para usuario falha ao pegar
            //middleware
            console.log(`Middleware: ${item} mising in library`);
          }
        });

        return middlewares;
}
