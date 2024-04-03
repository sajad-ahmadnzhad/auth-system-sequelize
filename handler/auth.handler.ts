import { RouteHandlerMethod } from "fastify";
import userModel from "../model/user.model";
import { Op } from "@sequelize/core";
import { RegisterBody } from "../interface/auth.interface";

export const register: RouteHandlerMethod = async (req, reply) => {
  const { name, username, email, password } = req.body as RegisterBody;
  const existingUser = await userModel.findOne({
    where: { [Op.or]: [{ username }, { email }] },
  });

  if (existingUser) {
    throw req.server.httpErrors.Conflict(
      "user with this username or email already exists"
    );
  }

  const hashPassword = await req.bcryptHash(password);
  const countUsers = await userModel.count();

  const user = await userModel.create({
    name,
    username,
    email,
    password: hashPassword,
    profile: "customProfile.png",
    isAdmin: countUsers === 0,
    isSuperAdmin: countUsers === 0,
  });

  const accessToken = req.server.jwt.sign({ id: user.dataValues.id });
  reply.setCookie("accessToken", accessToken, {
    path: "/",
    domain: "localhost",
  });

  reply.send({ message: "registered was successful" });
};
