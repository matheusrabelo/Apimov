'use strict';

import Databases from '../templates/databases';
import Routes from '../templates/routes';
import Application from '../templates/app/app';
import Index from '../templates/index';
import Router from '../templates/app/router';
import Middlewares from '../templates/middlewares';
import Writer from './writer';

export default class App {

    constructor(config) {
        this.config = config;
    }

    buildBasic() {
      this.api.app = [Application];
      this.api.index = Index;
    }

    buildDatabase() {
        const {database} = this.config;
        this.api.database = [];
        if (database) {
          try {
            this.database = Databases[database](this);
            this.api.database.push(this.database.model);
          } catch(e) {
            throw new Error('Missing Database library for: ' + database);
          }
        }
    }

    buildRoutes() {
        const routes = this.config.resource.routes;
        this.api.routes = [];
        routes.forEach((route) => {
            try {
              this.api.routes.push(Routes[route.toLowerCase()](this));
            } catch(e) {
              throw new Error('Missing Route library for: ' + route);
            }
        });
    }

    buildRouter() {
        const {middlewares} = this.config;
        this.api.middlewares = [];
        if (middlewares) {
            middlewares.forEach((middleware) => {
              try {
                this.api.middlewares.push(Middlewares[middleware](this));
              } catch(e) {
                throw new Error('Missing Middleware library for: ' +
                  middleware);
              }
            });
        }
        this.api.app.push(new Router(this));
    }

    build() {
        if(!this.config.src) {
          throw new Error('Build failed!\n Source not found');
        }

        try {
          this.api = {};
          this.buildBasic();
          this.buildDatabase();
          this.buildRoutes();
          this.buildRouter();
          let writer = new Writer(this);
          writer.writeFiles();
        } catch(e) {
            throw new Error('Build failed!\n' + e.message);
        }
    }
  }
