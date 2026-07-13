import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { hashPassword } from "../utils/Password.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/Tokens.util.js";

const generateRefreshAccessToken = async (user) => {
  try {
    const userId = user.id;
    console.log("Got user ID", userId);

    const accessToken = generateAccessToken(user);
    console.log("Got access Token", accessToken);

    const refreshToken = generateRefreshToken(user);
    console.log("Got refresh Token", refreshToken);

    await prisma.user.update({ where: { id: userId }, data: { refreshToken } });
    console.log("User updated");

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate refresh token", error);
  }
};

const register = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => !field.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const passwordHash = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: { name, email, password: passwordHash },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!newUser) {
    throw new ApiError(500, "Failed to register user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User registered successfully"));
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateRefreshAccessToken(user);

  const loggedInUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, email: true, role: true },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User Logged In Successfully",
      ),
    );
});

const logout = AsyncHandler(async (req, res) => {
  await prisma.user.update({
    where: { id: req.user.id },
    data: { refreshToken: null },
    select: { id: true, name: true, email: true, role: true },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { register, login, logout };
