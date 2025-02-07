import { Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const decodedToken = (req: Request) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  
  const decodedToken = verify(
    String(token),
    String(process.env.JWT_TOKEN_SECRET_KEY)
  ) as JwtPayload;

  return decodedToken;
};
