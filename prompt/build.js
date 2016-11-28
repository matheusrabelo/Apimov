import fs from "fs";
import  co from "co";
import app from "../app/app"
import errorHandler from "./errorHandlers"

export default () => {
  let config;
  co(() =>{
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
  })
  .catch(errorHandler.readerErrorHandler)
  .then(() => {
    new app(config).build();
  })
  .catch(errorHandler.buildErrorHandler);
};
