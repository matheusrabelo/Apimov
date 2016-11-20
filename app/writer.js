"use strict";

import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";

export default class Writer{

    constructor(app){
        this.config = app.config;
        this.api = app.api;
    }

    writeFile(src, file){
        mkdirp(src, err => { 
            if (err) throw new Error("Failed to create directory " + src + ": " + err.message);
            fs.writeFile(path.join(src, file.file), file.source, { "flag" : "w+" } , (err) => {
                if (err) throw new Error("Failed to write " + file.file + ": " + err.message);
            });
        });
    }

    writeFiles(){
        let src = path.join(__dirname, this.config.src);
        for (let prop in this.api) {
            if(Array.isArray(this.api[prop])){
                this.api[prop].forEach(item => {
                    if(item.source != undefined){
                        this.writeFile(path.join(src, prop), item);
                    }
                });
            }else{
                this.writeFile(src, this.api[prop]);
            }
        }
    }

}