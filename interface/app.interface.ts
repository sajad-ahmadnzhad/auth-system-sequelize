import httpErrors from 'http-errors'
declare module "fastify" {
    interface FastifyInstance{
        httpErrors: typeof  httpErrors
    }
}

export default {}