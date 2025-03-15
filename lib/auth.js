import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const signToken = (user) => {
  return jwt.sign(
    { _id: user.id, email: user.email, name: user.name, gender: user.gender },
    SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error(error);
    return null;
  }
};
