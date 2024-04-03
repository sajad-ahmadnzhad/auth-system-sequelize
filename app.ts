import { config } from "dotenv";
config();
import "./config/db.config";
import Fastify from "fastify";

const app = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 4300;

const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
  }
};

app.get('/', () => {
    return 'hello world'
})

start();
