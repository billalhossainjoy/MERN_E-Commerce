import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: Secret,
  options?: SignOptions
) => {
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (
  token: string,
  secret: Secret,
  options?: SignOptions
) => {
  return jwt.verify(token, secret, options) as JwtPayload;
};
