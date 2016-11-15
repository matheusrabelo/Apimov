export default (Resource, Dialect, Properties) => {

    let dialect = Dialect.toLowerCase();

    return `
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
        IsActive: Sequelize.BOOLEAN,
        ${Properties}
    });

    export default ${Resource};
    `;

};