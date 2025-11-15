import mongoose from "mongoose";
import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { genToken } from "./../config/token.js";

export const signup = async (req, res) => {
  try {
    //fetching
    const { name, email, password, role } = req.body;
    //check user exists
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    //check email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter valid Email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Enter String Password" });
    }
    //hash pass
    const hashPassword = await bcrypt.hash(password, 10);
    //create user
    const user = await User.create({
      name,
      role,
      email,
      password: hashPassword,
    });
    //generate tokken
    const token = await genToken(user._id);
    //setting toke in cookie
    req.cookie("token", token, {
      httpOnly: true,
      secue: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //retunr res
    return res
      .status(201)
      .json({ success: true, message: "User created ", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Sign up error ${error}` });
  }
};
