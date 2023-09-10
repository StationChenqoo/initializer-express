function timeMiddleware(request, respose, next) {
  const start = Date.now();
  next();
  const end = Date.now();
  console.log(`Next function executed in ${end - start} ms`);
}
module.exports = timeMiddleware;
