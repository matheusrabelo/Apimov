var prompt = require('co-prompt');

export default (config) => {
  return function * () {
    let foo, bar;
    console.log('Welcome to Apimov! (init selected)');
    console.log('Please fill in the configuration.');
    config.src = yield prompt('Source Directory: ');
    config.database = yield prompt('Database: ');

    console.log('Enter middlewares, input empty when finished: ');
    config.middlewares = [];
    while((foo = yield prompt('Middleware: ')) != "")
    {
      config.middlewares.push(foo);
    }

    console.log('Enter data elements, input empty as the name when finished: ');
    config.dataElements = [];
    while((foo = yield prompt('Data Element name: ')) != "")
    {
      let dataElement = {};
      dataElement.name = foo;
      dataElement.atributes = [];

      let innerAtribute = {};

      console.log('Enter atributes, input empty as the name when finished: ');
      while((foo = yield prompt('Atribute name: ')) != "")
      {
        innerAtribute.name =  foo;
        innerAtribute.dataType = yield prompt('Data Type: ');
        innerAtribute.routes = [];
        console.log('Choose routes (y for Yes, n for No):')
        bar = yield prompt('GET: ');
        if(bar = 'y') innerAtribute.routes.push('GET');
        bar = yield prompt('POST: ');
        if(bar = 'y') innerAtribute.routes.push('UPDATE');
        bar = yield prompt('UPDATE: ');
        if(bar = 'y') innerAtribute.routes.push('UPDATE');
        bar = yield prompt('DELETE: ');
        if(bar = 'y') innerAtribute.routes.push('DELETE');

        dataElement.atributes.push(innerAtribute);
      }

      config.dataElements.push(dataElement);
    }

    process.stdin.pause();
  };
}
