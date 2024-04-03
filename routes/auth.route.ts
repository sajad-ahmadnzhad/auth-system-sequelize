import { FastifyInstance } from "fastify";
import { logoutHandler, registerHandler } from '../handler/auth.handler';
import { logoutOptions, registerOptions } from "../schema/auth.schema";

export default async (fastify: FastifyInstance) => {
    fastify.post('/register' , registerOptions , registerHandler)
    fastify.post('/logout' , logoutOptions , logoutHandler)
}