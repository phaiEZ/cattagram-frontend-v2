import { sign, verify, type SignOptions } from "jsonwebtoken-esm";

const SECRET_KEY = process.env.JWT_SECRET || "yEWBxhy!wj@C&GUN";

export const signToken = (
  payload: object,
  expiresIn: string | number = "1 days"
) => {
  const options: SignOptions = { expiresIn };
  return sign(payload, SECRET_KEY, options);
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, SECRET_KEY);
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};
