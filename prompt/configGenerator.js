import prompt from 'co-prompt';
import colors from 'colors';

export default (config) => {
  return function * () {
    let foo, bar;
    console.log('Welcome to Apimov!'.blue);
    console.log('Please fill in the configuration.'.blue);
    config.src = yield prompt('Source Directory: ');
    config.database = yield prompt('Database: ');

    console.log('Enter middlewares, input empty when finished'.yellow);
    config.middlewares = [];
    while((foo = yield prompt('Middleware: ')) != "") {
      config.middlewares.push(foo);
    }

    let dataElement = {};
    dataElement.name = yield prompt('Data Element name: ');
    dataElement.atributes = [];

    let innerAtribute = {};

    console.log('Enter atributes, input empty as the name when finished'.yellow);
    while((foo = yield prompt('Atribute name: ')) != "") {
      innerAtribute.name =  foo;
      innerAtribute.dataType = yield prompt('Data Type: ');
      innerAtribute.routes = [];
      console.log('Choose routes (y for Yes, n for No)'.yellow)
      bar = yield prompt('GET: '.cyan);
      if(bar = 'y') innerAtribute.routes.push('GET');
      bar = yield prompt('GET BY ID: '.cyan);
      if(bar = 'y') innerAtribute.routes.push('GETBYID');
      bar = yield prompt('POST: '.cyan);
      if(bar = 'y') innerAtribute.routes.push('POST');
      bar = yield prompt('DELETE: '.cyan);
      if(bar = 'y') innerAtribute.routes.push('DELETE');

      dataElement.atributes.push(innerAtribute);
    }

    config.resource = dataElement;
    process.stdin.pause();
  };
}
