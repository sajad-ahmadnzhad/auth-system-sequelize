import { RouteShorthandOptions } from "fastify";
import authMiddleware from "../middleware/auth.middleware";

export const registerOptions: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      required: ["name", "username", "email", "password", "confirmPassword"],
      properties: {
        name: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        password: {
          type: "string",
          $id: "password",
          minLength: 8,
          maxLength: 30,
        },
        confirmPassword: { $ref: "password" },
      },
    },
    response: {
      200: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
export const loginOptions: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      required: ["identifier", "password"],
      properties: {
        identifier: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
export const logoutOptions: RouteShorthandOptions = {
  preHandler: authMiddleware,
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
export const refreshTokenOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
} as const;
