import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const port = process.env.PORT || 8000;

const server = async () => {
  try {
    await prisma.$connect();

    console.log("Connected to database");

    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

server();
