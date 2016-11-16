export default function helmet (Resource, Dialect, Properties) {

    let dialect = Dialect.toLowerCase();

    //TODO:Implementar direito codigo que sera exportado
    return `
    "use strict";

    import helmet from "helmet";

    let router = express.Router();

    router.use(helmet());

    export default router;
    `;

};
