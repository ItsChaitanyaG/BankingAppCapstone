import jwt from "jsonwebtoken";

const generateAccessToken = function (user) {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

const generateRefreshToken = function (user) {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};

export { generateAccessToken, generateRefreshToken };
