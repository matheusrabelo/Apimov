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
`
"use strict";

import Testing from "../database/model";

export default function postTesting(req, res){
    
};
`
,
`
"use strict";

import Testing from "../database/model";

export default function deleteTesting(req, res){
    
};
`
,
`
"use strict";

import Testing from "../database/model";

export default function getTestingByID(req, res){
    
};
`
];

export const router = `
"use strict";

import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import authenticate from "../middlewares/authenticate";

import postTesting from "../routes/postTesting";
import deleteTesting from "../routes/deleteTesting";
import getTesting from "../routes/getTestingByID";


let router = express.Router();

router.use(bodyParser.json());

router.use(helmet());

import fs from "fs";
const logStream = fs.createWriteStream(path.join(__dirname, '../request.log'), {flags: 'a+'});
router.use(morgan("common", {stream: logStream}));

router.use(authenticate);


router.post("/Testing/:id", postTesting);
router.delete("/Testing/:id", deleteTesting);
router.get("/Testing/:id", getTestingByID);


export default router;
`;