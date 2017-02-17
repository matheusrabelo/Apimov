import  co from "co";
import configGenerator from "./configGenerator";
import fs from "fs";
import app from "../app/app"
import errorHandler from "./errorHandlers"

export default () => {
  let config = {};
  co(configGenerator(config)())
  .then(() => {
    fs.writeFile('config.json', JSON.stringify(config, null, 2), 'utf8', () =>{});
    })
  .catch(errorHandler.writeErrorHandler)
  .then(() => {
    new app(config).build();
  })
  .catch(errorHandler.buildErrorHandler);
};
