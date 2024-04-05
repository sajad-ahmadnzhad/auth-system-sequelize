import { config } from "dotenv";
config();
import "./config/db.config";
import Fastify from "fastify";
import mainRoute from "./routes/main.route";
import cookie from "@fastify/cookie";
import bcrypt from "fastify-bcrypt";
import httpErrorsPlugin from "./plugin/httpErrors.plugin";
import jwt from "@fastify/jwt";
import "./interface/app.interface";
import redis from "@fastify/redis";

const app = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 4300;

const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
  }
};
app.register(httpErrorsPlugin);
app.register(redis, { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) });
app.register(cookie, { secret: process.env.COOKIE_SECRET });
app.register(bcrypt, { saltWorkFactor: 12 });
app.register(jwt, { secret: process.env.JWT_SECRET as string });
app.register(mainRoute);

start();
