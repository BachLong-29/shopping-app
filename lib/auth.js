import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const signToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error(error);
    return null;
  }
};
