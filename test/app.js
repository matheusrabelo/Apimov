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
        app.build();

        expect(app.model).to.be.equal(AppExpect.model);
    });

    it("Should build mysql methods", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.build();

        expect(app.database.create).to.be.equal(AppExpect.mysql.create);
        expect(app.database.remove).to.be.equal(AppExpect.mysql.remove);
        expect(app.database.get).to.be.equal(AppExpect.mysql.get);
        expect(app.database.getById).to.be.equal(AppExpect.mysql.getById);
    });


});