export default () => {
    return {
        'import': `morgan`,
        'additional': `import fs from "fs";`,
        'use': `morgan("common", {
            stream: fs.createWriteStream('../request.log', {flags: 'a+'}),
        })`,
    };
};
