import co from 'co';
import configGenerator from './configGenerator';
import fs from 'fs';
import App from '../app/app';
import errorHandler from './errorHandlers';
import mkdirp from 'mkdirp';
import path from 'path';
import process from 'process';

export default () => {
  let config = {};
  co(configGenerator(config)())
  .then(() => {
    mkdirp(path.join(process.cwd(), config.src), (err) => {
        if (err) throw new Error('Failed to create directory ' +
            config.src + ': ' + err.message);
        fs.writeFile(path.join(process.cwd(), config.src, 'apimov.json'),
          JSON.stringify(config, null, 2),
          {'flag': 'w+'},
          (err) => {
            if (err) throw new Error('Failed to write config :' + err.message);
        });
    });
  })
  .catch(errorHandler.writeErrorHandler)
  .then(() => {
    new App(config).build();
  })
  .catch(errorHandler.buildErrorHandler);
};
