import { RouteHandlerMethod } from "fastify";
import userModel from "../model/user.model";
import { Op } from "@sequelize/core";
import { LoginBody, RegisterBody } from "../interface/auth.interface";

export const registerHandler: RouteHandlerMethod = async (req, reply) => {
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

  const accessToken = req.server.jwt.sign({ id: user.dataValues.id } , {expiresIn: '30d'});
  const twoMonths = 60 * 60 * 24 * 60 * 1000;
  reply.setCookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    maxAge: twoMonths,
    path: "/",
  });

  reply.send({ message: "registered was successful" });
};
export const logoutHandler: RouteHandlerMethod = async (req, reply) => {
  reply.clearCookie("accessToken");
  reply.send({ message: "logout was successful" });
};
export const loginHandler: RouteHandlerMethod = async (req, reply) => {
  const { identifier, password } = <LoginBody>req.body;
  const { httpErrors } = req.server;
  const user = await userModel.findOne({
    where: { [Op.or]: [{ username: identifier }, { email: identifier }] },
  });

  if (!user) {
    throw httpErrors.NotFound("User not found");
  }

  const comparePassword = await req.server.bcrypt.compare(
    password,
    user.dataValues.password
  );

  if (!comparePassword) {
    throw httpErrors.BadRequest("password is not valid");
  }

  const accessToken = req.server.jwt.sign(
    { id: user.dataValues.id },
    { expiresIn: "30d" }
  );

  const twoMonths = 60 * 60 * 24 * 60 * 1000;
  reply.setCookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    maxAge: twoMonths,
    path: "/",
  });

  reply.send({ message: "your logged in successful" });
};
