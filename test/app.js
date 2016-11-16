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
        app.config.middlewares = new Array();
        app.config.routes = new Array();
        app.build();

        expect(app.database.model).to.be.equal(AppExpect.model);
    });

    it("Should build mysql methods", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.middlewares = new Array();
        app.config.routes = new Array();
        app.build();
        
        expect(app.database.methods.create).to.be.equal(AppExpect.mysql.create);
        expect(app.database.methods.remove).to.be.equal(AppExpect.mysql.remove);
        expect(app.database.methods.get).to.be.equal(AppExpect.mysql.get);
        expect(app.database.methods.getById).to.be.equal(AppExpect.mysql.getById);
    });

    it("Should build routes", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.middlewares = new Array();
        app.config.routes = ["post", "remove", "get"];
        app.build();

        expect(app.routes[0].code).to.be.equal(AppExpect.routes[0]);
        expect(app.routes[1].code).to.be.equal(AppExpect.routes[1]);
        expect(app.routes[2].code).to.be.equal(AppExpect.routes[2]);
    });

    it("Should build router", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.middlewares = ["helmet", "morgan"];
        app.config.routes = ["post", "remove", "get"];

        app.build();

        expect(app.router).to.be.equal(AppExpect.router);
    });


});