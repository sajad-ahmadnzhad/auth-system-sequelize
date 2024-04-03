import httpErrors from "http-errors";
import fp from "fastify-plugin";

export default fp((fastify, options, done) => {
  fastify.decorate("httpErrors", httpErrors);
  done();
});
