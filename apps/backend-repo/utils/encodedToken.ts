import { sign } from "jsonwebtoken";

export const encodedData = (data: string) =>
  sign(data, String(process.env.JWT_TOKEN_SECRET_KEY));
