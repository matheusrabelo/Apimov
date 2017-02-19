import fs from 'fs';
import co from 'co';
import App from '../app/app';
import errorHandler from './errorHandlers';
import process from 'process';

export default (src) => {
  let config;
  co(() =>{
    config = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), src, 'apimov.json'), 'utf8'));
  })
  .catch(errorHandler.readerErrorHandler)
  .then(() => {
    new App(config).build();
  })
  .catch(errorHandler.buildErrorHandler);
};
