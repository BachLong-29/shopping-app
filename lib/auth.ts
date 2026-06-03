import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface TokenPayload {
  _id: string;
  email: string;
  name: string;
}

interface UserLike {
  _id: unknown;
  email: string;
  name: string;
}

export const signAccessToken = (user: UserLike): string => {
  return jwt.sign(
    { _id: String(user._id), email: user.email, name: user.name },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const signRefreshToken = (user: UserLike): string => {
  return jwt.sign(
    { _id: String(user._id), email: user.email, name: user.name },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};

// Backward-compat aliases
export const signToken = signAccessToken;
export const verifyToken = verifyAccessToken;
