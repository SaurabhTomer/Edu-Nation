import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { sendMail } from "./../config/sendMail.js";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

//google auth
export const googleAuth = async (req, res) => {
  try {
    const { id_token, role } = req.body;
    if (!id_token) {
      return res.status(400).json({ ok: false, message: "id_token required" });
    }

    // verify google id_token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ ok: false, message: "Invalid token" });
    }

    // You may require verified email:
    if (!payload.email_verified) {
      return res
        .status(403)
        .json({ ok: false, message: "Google email not verified" });
    }
    //extract google profile data
    const email = payload.email;
    const name = payload.name || "";
    const googleId = payload.sub;
    const avatar = payload.picture;

    // upsert(find or craete) user
    let user = await User.findOne({ email });

    if (!user) {
      const normalizedRole =
        role === "educator" || role === "student" ? role : "student";
      user = await User.create({
        name,
        email,
        role: normalizedRole,
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
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //setting tok(en) in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // required with sameSite: "none"
      sameSite: "none", // allow cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //return res
    return res.status(201).json({
      success: true,
      message: "User created ",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Sign up error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid Email",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Match password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true only in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        role: user.role,
        user: user.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Login error",
    });
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

export const sendOTP = async (req, res) => {
  try {
    //fetch email
    const { email } = req.body;

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    //generate otp
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    //chnage in user
    user.resetOtp = otp,
    user.otpExpires = Date.now() + 5 * 60 * 100,
    user.isOtpVerified = false,
      //save user
      await user.save();
      //send otp
    await sendMail(email, otp);

    return res.status(200).json({ message: "Otp send successfully" });
  } catch (error) {
     return res
      .status(500)
      .json({ success: false, message: `send otp error ${error}` });
  }
};


export const verifyOTP = async (req, res) => {
  try {
    //fetch email and otp
    const { email , otp } = req.body;
     //find user
    const user = await User.findOne({ email });

    //check otp is valid or not
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

      //change in user
    user.isOtpVerified = true,
    user.resetOtp = undefined,
    user.otpExpires = undefined,
    
      //save user
    await user.save();
     

    return res.status(200).json({ message: "Otp verified successfully" });
  } catch (error) {
     return res
      .status(500)
      .json({ success: false, message: `verify otp error ${error}` });
  }
};


export const ResetPassword = async (req, res) => {
  try {

    //fetch email and password
    const { email , password , confirmPassword } = req.body;

     //find user
    const user = await User.findOne({ email });

    //check 
    if (!user || !user.isOtpVerified) {
      return res.status(404).json({ message: "OTP verification is required" });
    }


    //check 
    if (password != confirmPassword) {
      return res.status(404).json({ message: "Password are not matched" });
    }

    const hashPassword = await bcrypt.hash( password , 10);

    user.password = hashPassword;
    user.isOtpVerified = false;
    
    //save user
    await user.save();
     

    return res.status(200).json({ message: "Password Reset successfully" });
  } catch (error) {
     return res
      .status(500)
      .json({ success: false, message: `Reset Password error ${error}` });
  }
};
