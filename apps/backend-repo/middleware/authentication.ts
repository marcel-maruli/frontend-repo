import { NextFunction, Request, Response } from "express";
import { decodedToken } from "../utils/decodedToken";
import * as logger from "firebase-functions/logger";

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = decodedToken(req);
    const id = token.id;
      

    if (req.params.userId && req.params.userId != id) {
      res.status(403).send({
        status: 403,
        message: "Forbidden!",
      });
      logger.info("Hello logs!", { structuredData: true });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
