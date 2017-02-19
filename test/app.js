import App from '../app/app';
import Chai from 'chai';
import * as AppExpect from './app-expect';
import rimraf from 'rimraf';
import path from 'path';
import process from 'process';
import {copy} from './utils';

const config = require('./app-config');
const expect = Chai.expect;

describe('Apimov', () => {
    let app;
    let configuration;

    beforeEach(() => {
        configuration = {};
        configuration = copy(config);
        app = new App(configuration);
    });

    afterEach((done) => {
        rimraf(path.join(process.cwd(), 'test/booksapi'), () => done());
    });

    it('Should throw error', () => {
        app = new App({});
        expect(() => app.build()).to.throw(Error);
    });

    it('Should throw error for missing resource', () => {
        configuration.resource = null;
        app = new App(configuration);

        expect(() => app.build()).to.throw(Error);
    });

    it('Should build mysql model', () => {
        app = new App(configuration);
        app.build();

        expect(app.api.database[0].source).to.be.equal(AppExpect.model);
    });

    it('Should not build database model on missing library', () => {
        configuration.database = 'testMissingDatabase';
        app = new App(configuration);

        expect(() => app.build()).to.throw(Error);
    });

    it('Should build mysql methods', () => {
        app.build();

        expect(app.database.methods.post).to.be.equal(AppExpect.mysql.create);
        expect(app.database.methods.delete).to.be.equal(AppExpect.mysql.remove);
        expect(app.database.methods.get).to.be.equal(AppExpect.mysql.get);
        expect(app.database.methods.getById)
            .to.be.equal(AppExpect.mysql.getById);
    });

    it('Should build routes', () => {
        app.build();

        expect(app.api.routes[2].source).to.be.equal(AppExpect.routes[0]);
        expect(app.api.routes[3].source).to.be.equal(AppExpect.routes[1]);
        expect(app.api.routes[0].source).to.be.equal(AppExpect.routes[2]);
    });

    it('Should not build routes on missing library', () => {
        configuration.resource.routes.push('testMissingRoute');
        app = new App(configuration);

        expect(() => app.build()).to.throw(Error);
    });

    it('Should build router', () => {
        app.build();

        expect(app.api.app[1].source).to.be.equal(AppExpect.router);
    });

    it('Should not build router on missing library', () => {
        configuration.resource.routes.push('testMissingRoute');
        app = new App(configuration);

        expect(() => app.build()).to.throw(Error);
    });

    it('Should build empty array of middlewares', () => {
        configuration.middlewares = [];
        app.build(configuration);

        expect(app.api.middlewares).to.be.a('array');
        expect(app.api.middlewares.length).to.be.equal(0);
    });

    it('Should build middlewares', () => {
        app.build();

        expect(app.api.middlewares).to.be.a('array');
        app.api.middlewares.forEach((item) => {
          expect(item.import).to.not.be.a('undefined');
          expect(item.use).to.not.be.a('undefined');
        });
    });

    it('Should not build middlewares on missing library', () => {
        configuration.middlewares.push('testMissingMiddleware');
        app = new App(configuration);

        expect(() => app.build()).to.throw(Error);
    });
});
