import { RouteHandlerMethod } from "fastify";
import userModel from "../model/user.model";
import { Op } from "@sequelize/core";
import {
  LoginBody,
  RegisterBody,
  UserAttributes,
} from "../interface/auth.interface";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateToken";

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

  const accessToken = generateAccessToken(
    req.server,
    user.dataValues.id as number
  );

  reply.setCookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite: true,
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

  const accessToken = generateAccessToken(
    req.server,
    user.dataValues.id as number
  );
  const refreshToken = generateRefreshToken(
    req.server,
    user.dataValues.id as number
  );

  await user.update({ refreshToken });

  const cookieOptions = {
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite: true,
  };

  reply.setCookie("accessToken", accessToken, cookieOptions);

  reply.setCookie("refreshToken", refreshToken, cookieOptions);

  reply.send({ message: "your logged in successful" });
};
export const refreshTokenHandler: RouteHandlerMethod = async (req, reply) => {
  const { refreshToken } = req.cookies;
  const { httpErrors } = req.server;
  if (!refreshToken) {
    throw httpErrors.Unauthorized("Refresh token not found");
  }

  const user = (await userModel.findOne({ where: { refreshToken } }))
    ?.dataValues as UserAttributes;

  if (!user) {
    throw httpErrors.NotFound("User not found");
  }

  req.server.jwt.verify(user.refreshToken);

  const newAccessToken = generateAccessToken(req.server, user.id);

  const cookieOptions = {
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite: true,
  };

  reply.setCookie("accessToken", newAccessToken , cookieOptions);

  reply.send({ message: "accessToken was created successfully" });
};
