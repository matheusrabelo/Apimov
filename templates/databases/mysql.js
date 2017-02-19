export default (app) => {

    let Resource = app.config.resource.name;
    let Properties = "";
    app.config.resource.atributes.forEach((item, i) => {
        let comma = ',';
        if (i === app.config.resource.atributes.length - 1) {
            comma = '';
        };
        Properties += `
        ${item.name}: ${item.dataType}${comma}`;
    });
    let resource = Resource.toLowerCase();

    let model =  `
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

    let ${Resource} = sequelize.define(configuration.mySQL.table, {
        CreatedAt: Sequelize.DATE,
        IsActive: Sequelize.BOOLEAN,${Properties}
    });

    export default ${Resource};
    `;

    let create = `
        let ${resource} = req.body;
        ${resource}.IsActive = '1';

        ${Resource}.create(${resource})
            .then((response) => {
                res.status(201);
                res.json(response);
            })
            .catch((response) => {
                res.status(500);
                res.json(response);
            });
    `;

    let remove = `
        ${Resource}.findOne({where: ['id = ?', req.params.id]})
                .then(() => {
                    return ${Resource}.update({
                    'IsActive': 0
                    }, {where: ['id = ?', req.params.id]});
                });
        
        res.status(202);
        res.json({});
    `;

    let getByID = `
        let args = {};
        args.where = ['isActive AND id = ?', req.params.id];

        ${Resource}.findOne(args).then(${resource} => {
            if (${resource} == null) ${resource} = {};
            res.status(202);
            res.json(${resource});
        });
    `;

    let get = `
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

        ${Resource}.findAll(args).then(${resource} => {
            res.status(202);
            res.json(${resource});
        });
    `;

    return {
        "model": {
            "file": "model.js",
            "source": model
        },
        "methods": { 
            "post": create, 
            "delete": remove, 
            "getByID": getByID, 
            "get": get
        }
    };

};