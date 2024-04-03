import { FastifyInstance } from "fastify";
import { loginHandler, logoutHandler, registerHandler } from '../handler/auth.handler';
import { loginOptions, logoutOptions, registerOptions } from "../schema/auth.schema";

export default async (fastify: FastifyInstance) => {
    fastify.post('/register' , registerOptions , registerHandler)
    fastify.post('/logout' , logoutOptions , logoutHandler)
    fastify.post('/login' , loginOptions , loginHandler)
}