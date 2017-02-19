import prompt from 'co-prompt';
import 'colors';

export default (config) => {
  return function* () {
    let atributesVar;
    let atributesBoolean; // eslint-disable-line no-unused-vars
    console.log('Welcome to Apimov!'.blue);
    console.log('Please fill in the configuration.'.blue);
    config.src = yield prompt('Source Directory: ');
    config.database = yield prompt('Database: ');

    console.log('Enter middlewares, input empty when finished'.yellow);
    config.middlewares = [];
    while ((atributesVar = yield prompt('Middleware: ')) != '') {
      config.middlewares.push(atributesVar);
    }

    let dataElement = {};
    dataElement.name = yield prompt('Resource name: ');
    dataElement.atributes = [];
    dataElement.routes = [];

    let innerAtribute = {};

    console.log('Enter atributes, input empty'.yellow +
      ' as the name when finished'.yellow);
    while ((atributesVar = yield prompt('Atribute name: ')) != '') {
      innerAtribute.name = atributesVar;
      innerAtribute.dataType = yield prompt('Data Type: ');
    }

    console.log('Choose routes (y for Yes, n for No)');
    atributesBoolean = yield prompt('GET: '.cyan);
    if(atributesBoolean = 'y') dataElement.routes.push('GET');
    atributesBoolean = yield prompt('GET BY ID: '.cyan);
    if(atributesBoolean = 'y') dataElement.routes.push('GETBYID');
    atributesBoolean = yield prompt('POST: '.cyan);
    if(atributesBoolean = 'y') dataElement.routes.push('POST');
    atributesBoolean = yield prompt('DELETE: '.cyan);
    if(atributesBoolean = 'y') dataElement.routes.push('DELETE');

    dataElement.atributes.push(innerAtribute);

    config.resource = dataElement;
    process.stdin.pause();
  };
};
