// userService.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

class LoginService {
  // Get
  async Login(req, res) {
    try {
      const users = await prisma.users.findUnique({
        where: {
          username: req.body.username,
        },
      });
      if (!users) {
        throw new Error("Username not found");
      }
      const isMatch = await bcrypt.compare(
        req.body.password,
        users.passwordhash,
      );
      if (!isMatch) {
        throw new Error("Password is incorrect.");
      } else {
        const payload = { userId: users.id, username: users.username };
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
        return { token };
      }
    } catch (error) {
      throw new Error(`Error occurred while fetching users: ${error.message}`);
    }
  }

  async ForgetPassword_SendOTP(req) {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.service_mail,
        pass: process.env.service_mail_password,
      },
    });

    await transporter.sendMail({
      from: process.env.service_mail,
      to: user.email,
      subject: "OTP",
      text: otp,
    });

    await prisma.users.update({
      where: { email: req.body.email },
      data: {
        otp,
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    return true;
  }

  async ForgetPassword_NewPassword(req, res) {
    const user = await prisma.users.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (user.otp !== req.body.otp || user.otpExpiry < new Date()) {
      throw new Error("Invalid or expired OTP");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      await prisma.users.update({
        where: {
          email: req.body.email,
        },
        data: {
          passwordhash: hashedPassword,
          otp: null,
          otpExpiry: null,
        },
      });
    }
  }
}

export default new LoginService();
