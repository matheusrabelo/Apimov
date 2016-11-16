export const model =  `
    "use strict";

    import Sequelize from "sequelize";
    import configuration from "../configuration.json";
    import logging from "./logging";

    let sequelize = new Sequelize(configuration.mySQL.db, configuration.mySQL.user, configuration.mySQL.password, {
        host: configuration.mySQL.host,
        dialect: 'mysql',
        logging: logging,
        define: {
            timestamps: false
        }
    });

    let Testing = sequelize.define(configuration.mySQL.table, {
        CreatedAt: Sequelize.DATE,
        IsActive: Sequelize.BOOLEAN,
        
    });

    export default Testing;
    `;

export const mySQLCreate = `
        let testing = req.body;
        testing.IsActive = '1';

        Testing.create(testing)
            .then((response) => {
                res.status(201);
                res.json(response);
            })
            .catch((response) => {
                res.status(500);
                res.json(response);
            });
    `;

export const mySQLRemove = `
        Testing.findOne({where: ['id = ?', req.params.id]})
                .then(() => {
                    return Testing.update({
                    'IsActive': 0
                    }, {where: ['id = ?', req.params.id]});
                });
        
        res.status(202);
        res.json({});
    `;

export const mySQLGetByID = `
        let args = {};
        args.where = ['isActive AND id = ?', req.params.id];

        Testing.findOne(args).then(testing => {
            if (testing == null) testing = {};
            res.status(202);
            res.json(testing);
        });
    `;

export const mySQLGet = `
        let args = {};
        args.where = ['isActive'];

        if(req.query.from){
            args.offset = parseInt(req.query.from);
        }

        if(req.query.pageSize){
            args.limit = parseInt(req.query.pageSize);
        }

        if(req.query.page){
            args.offset = (parseInt(req.query.page) - 1) * 10;
            args.limit = 10;
        }

        Testing.findAll(args).then(testing => {
            res.status(202);
            res.json(testing);
        });
    `;

export const mysql = { "create": mySQLCreate, "remove" : mySQLRemove, "get": mySQLGet, "getByID": mySQLGetByID};

export const routes = [
`"use strict";

import Testing from "../database/model";

export default function postTesting(req, res){
    
        let testing = req.body;
        testing.IsActive = '1';

        Testing.create(testing)
            .then((response) => {
                res.status(201);
                res.json(response);
            })
            .catch((response) => {
                res.status(500);
                res.json(response);
            });
    
};
`
,
`"use strict";

import Testing from "../database/model";

export default function removeTesting(req, res){
    
        Testing.findOne({where: ['id = ?', req.params.id]})
                .then(() => {
                    return Testing.update({
                    'IsActive': 0
                    }, {where: ['id = ?', req.params.id]});
                });
        
        res.status(202);
        res.json({});
    
};
`
,
`
"use strict";

import Testing from "../database/model";

export default function getTesting(req, res){
    
        let args = {};
        args.where = ['isActive'];

        if(req.query.from){
            args.offset = parseInt(req.query.from);
        }

        if(req.query.pageSize){
            args.limit = parseInt(req.query.pageSize);
        }

        if(req.query.page){
            args.offset = (parseInt(req.query.page) - 1) * 10;
            args.limit = 10;
        }

        Testing.findAll(args).then(testing => {
            res.status(202);
            res.json(testing);
        });
    
};
`
];

export const router = `
"use strict";

import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import postTesting from "../routes/postTesting";
import removeTesting from "../routes/removeTesting";
import getTesting from "../routes/getTesting";

let router = express.Router();
router.use(bodyParser.json());
router.use(helmet());
import fs from "fs";
router.use(morgan("common", {stream: fs.createWriteStream('../request.log', {flags: 'a+'})}));

router.post("/Testing", postTesting);
router.delete("/Testing/:id", removeTesting);
router.get("/Testing", getTesting);

export default router;`;