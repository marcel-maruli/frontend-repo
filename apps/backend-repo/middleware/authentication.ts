import { NextFunction, Request, Response } from "express";
import { decodedToken } from "../utils/decodedToken";

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = decodedToken(req);
    const userEmail = token.email;

    if (req.params.email && req.params.email !== userEmail) {
      res.status(403).send({
        status: 403,
        message: "Forbidden!",
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
