export default {
    readerErrorHandler, buildErrorHandler, writeErrorHandler
};

function readerErrorHandler(e) {
  console.log('Error reading apimov.json');
}

function writeErrorHandler(e) {
  console.log('Error writing config! Next build will fail');
}

function buildErrorHandler(e) {
  console.log(e);
}
