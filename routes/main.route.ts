import { FastifyInstance } from "fastify";
import authRoute from "./auth.route";

export default async (fastify: FastifyInstance) => {
    fastify.register(authRoute, {prefix: 'v1/auth'})
}