export default (Resource, Dialect, Properties) => {

    let dialect = Dialect.toLowerCase();

    return `
    "use strict";

    import Sequelize from "sequelize";
    import configuration from "../configuration.json";
    import logging from "./logging";

    let sequelize = new Sequelize(configuration.${Dialect}.db, configuration.${Dialect}.user, configuration.${Dialect}.password, {
        host: configuration.${Dialect}.host,
        dialect: '${dialect}',
        logging: logging,
        define: {
            timestamps: false
        }
    });

    let ${Resource} = sequelize.define(configuration.${Dialect}.table, {
        CreatedAt: Sequelize.DATE,
        IsActive: Sequelize.BOOLEAN,
        ${Properties}
    });

    export default ${Resource};
    `;

};