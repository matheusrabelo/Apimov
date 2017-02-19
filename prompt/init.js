import co from 'co';
import configGenerator from './configGenerator';
import fs from 'fs';
import App from '../app/app';
import errorHandler from './errorHandlers';
import path from 'path';
import process from 'process';

export default () => {
  let config = {};
  co(configGenerator(config)())
  .then(() => {
    fs.writeFile(
      path.join(process.cwd(), config.src, 'apimov.json'),
      JSON.stringify(config, null, 2), 'utf8', () => {});
  })
  .catch(errorHandler.writeErrorHandler)
  .then(() => {
    new App(config).build();
  })
  .catch(errorHandler.buildErrorHandler);
};
