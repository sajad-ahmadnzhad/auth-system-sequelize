import { FastifyInstance } from "fastify";

export const generateAccessToken = (
  fastify: FastifyInstance,
  userId: number
): string => {
  const accessToken = fastify.jwt.sign({ id: userId }, { expiresIn: "10s" });
  return accessToken;
};
export const generateRefreshToken = (
  fastify: FastifyInstance,
  userId: number
): string => {
  const refreshToken = fastify.jwt.sign({ id: userId }, { expiresIn: "30d" });
  return refreshToken;
};
