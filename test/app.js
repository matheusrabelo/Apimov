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

    it("Should build routes", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.routes = [
            {
                "method": "Post",
                "additional": "",
                "action": "",
                "path": "/Testing"
            },
            {
                "method": "Delete",
                "additional": "",
                "action": "",
                "path": "/Testing"
            },
            {
                "method": "Get",
                "additional": "ByID",
                "action": "",
                "path": "/Testing"
            }
        ];
        app.build();

        expect(app.routes[0]).to.be.equal(AppExpect.routes[0]);
        expect(app.routes[1]).to.be.equal(AppExpect.routes[1]);
        expect(app.routes[2]).to.be.equal(AppExpect.routes[2]);
    });

    it("Should build router", () => {
        app.config.src = "test/build/";
        app.config.database = "mysql";
        app.config.resource = "Testing";
        app.config.properties = "";
        app.config.routes = [
            {
                "method": "Post",
                "additional": "",
                "action": "",
                "path": "/Testing/:id"
            },
            {
                "method": "Delete",
                "additional": "",
                "action": "",
                "path": "/Testing/:id"
            },
            {
                "method": "Get",
                "additional": "ByID",
                "action": "",
                "path": "/Testing/:id"
            }
        ];

        app.config.middlewares = [
            {
                "name": "helmet",
                "use": "helmet()",
                "additional": "",
                "from": "helmet"
            },
            {
                "name": "morgan",
                "use": `morgan("common", {stream: logStream})`,
                "additional": `
import fs from "fs";
const logStream = fs.createWriteStream(path.join(__dirname, '../request.log'), {flags: 'a+'});`,
                "from": "morgan"
            },
            {
                "name": "authenticate",
                "use": `authenticate`,
                "additional": "",
                "from": "../middlewares/authenticate"
            }
        ];

        app.build();

        expect(app.router).to.be.equal(AppExpect.router);
    });


});