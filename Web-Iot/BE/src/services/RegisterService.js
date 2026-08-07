// userService.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const prisma = new PrismaClient();

class RegisterService {
  // Get  
  async createUser(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await prisma.users.create({
        data: {
          email: req.body.email,
          username: req.body.username,
          passwordhash: hashedPassword
        }
      });
      return user;
    } catch (error) {
      throw new Error(`Error occurred while creating user: ${error.message}`);
    }
  }
}

export default new RegisterService();