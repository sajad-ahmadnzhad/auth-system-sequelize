import { FastifyInstance } from "fastify";
import { register } from '../handler/auth.handler';
import { registerOptions } from "../schema/auth.schema";

export default async (fastify: FastifyInstance) => {
    fastify.post('/register' , registerOptions , register)
}