import App from "../app/app";
import Chai from "chai";
import * as AppExpect from "./app-expect";

const expect = Chai.expect;

describe("App", () => {

    let app;

    beforeEach(() => {
        app = new App({});
    });

    it("Should throw error", () => {

        expect(app.build).to.throw(Error);

    });

    it("Should build mysql model", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.middlewares = [];
        app.build();

        expect(app.model).to.be.equal(AppExpect.model);
    });

    it("Should build mysql methods", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.middlewares = [];
        app.build();

        expect(app.database.create).to.be.equal(AppExpect.mysql.create);
        expect(app.database.remove).to.be.equal(AppExpect.mysql.remove);
        expect(app.database.get).to.be.equal(AppExpect.mysql.get);
        expect(app.database.getById).to.be.equal(AppExpect.mysql.getById);
    });

    it("Should throw error for missing middleware config", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        expect(app.build).to.throw(Error);
    });

    it("Should build empty array of middlewares", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.middlewares = [];
        app.build();

        expect(app.middlewares).to.be.a('array');
        expect(app.middlewares.length).to.be.equal(0);
    });

    it("Should build middlewares", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.middlewares = ["helmet"];
        app.build();

        expect(app.middlewares).to.be.a('array');
        app.middlewares.forEach((item) => {
          expect(item).to.be.a("function");
        });
    });

    it("Should build middlewares even on missing library", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.middlewares = ["helmet", "testError"];
        app.build();

        expect(app.middlewares).to.be.a('array');
        app.middlewares.forEach((item) => {
          expect(item).to.be.a("function");
        });
        expect(app.middlewares.length).to.be.equal(1);
    });
});
