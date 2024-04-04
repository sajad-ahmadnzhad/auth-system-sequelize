import { FastifyInstance } from "fastify";
import { loginHandler, logoutHandler, refreshTokenHandler, registerHandler } from '../handler/auth.handler';
import { loginOptions, logoutOptions, refreshTokenOptions, registerOptions } from "../schema/auth.schema";

export default async (fastify: FastifyInstance) => {
    fastify.post('/register' , registerOptions , registerHandler)
    fastify.post('/logout' , logoutOptions , logoutHandler)
    fastify.post('/login' , loginOptions , loginHandler)
    fastify.post('/refresh-token' , refreshTokenOptions , refreshTokenHandler)
}