import { FastifyReply, FastifyRequest } from "fastify";
import { JWTPayload } from "../interface/auth.interface";
import userModel from "../model/user.model";
export default async (req: FastifyRequest): Promise<void> => {
  const token = req.cookies.accessToken;
  const { httpErrors } = req.server;
  if (!token) {
    throw httpErrors.Forbidden(
      "This path is protected. To access it, you must log in first"
    );
  }

  const verifyToken = <JWTPayload>req.server.jwt.verify(token);

  const user = await userModel.findOne({ where: { id: verifyToken.id } });

  if (!user) {
    throw httpErrors.BadRequest("User not found");
  }

  req.user = user;
};
