import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "./../config/token.js";
import { OAuth2Client } from 'google-auth-library';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

//google auth
export  const googleAuth = async(req, res) => {
  try {
    const { id_token, role } = req.body;
    if (!id_token) {
      return res.status(400).json({ ok: false, message: 'id_token required' });
    }

    // verify google id_token
    const ticket = await client.verifyIdToken({
       idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID ,
      });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ ok: false, message: 'Invalid token' });
    }

    // You may require verified email:
    if (!payload.email_verified) {
      return res.status(403).json({ ok: false,
         message: 'Google email not verified' });
    }
//extract google profile data
    const email = payload.email;
    const name = payload.name || '';
    const googleId = payload.sub;
    const avatar = payload.picture;

    // upsert(find or craete) user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        role: role === role || 'student',
        googleId,
        avatar,
      });
 } 

    // Generate Token 
    const token = await genToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }

    // set cookie (optional) and return json
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message:"Login Successfully",
      token,
      user,
    });
  }  catch (error) {
    console.log("Google auth error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const signup = async (req, res) => {
  try {
    //fetching
    const { name, email, password, role } = req.body;
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

    //check user exists
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User already exists" });
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
    res.cookie("token", token, {
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

export const login = async (req, res) => {
  try {
    //fetching
    const { email, password } = req.body;

    //check email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter valid Email" });
    }

    //check user exists
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // match pass
    const decodePass = await bcrypt.compare(user.password, password);
    if (!decodePass) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    //generate tokken
    const token = await genToken(user._id);
    //setting toke in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secue: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //retunr res
    return res
      .status(200)
      .json({ success: true, message: "Login success ", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `login  error ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ success: true, message: "logout success" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `logout error ${error}` });
  }
};

