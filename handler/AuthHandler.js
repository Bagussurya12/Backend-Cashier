import user from "../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { isEmailExist } from "../libraries/isEmailExist.js";

const env = dotenv.config().parsed;

// GENERATE AND REFRESH TOKEN JWT
const generateAccessToken = async (payload) => {
  return jsonwebtoken.sign(payload, env.JWT_ACCES_TOKEN_SECRET, { expiresIn: env.JWT_ACCES_TOKEN_LIFE });
};
const generateRefreshToken = async (payload) => {
  return jsonwebtoken.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: env.JWT_REFRESH_TOKEN_LIFE });
};

// HANDLER LOGIN
const login = async (req, res) => {
  try {
    if (!req.body.email) {
      throw { code: 428, message: " E-mail Is Require" };
    }
    if (!req.body.password) {
      throw { code: 428, message: " PASSWORD_IS_REQUIRE" };
    }

    // Check USER exist
    const User = await user.findOne({ email: req.body.email });
    if (!User) {
      throw { code: 403, message: "ACCOUNT_NOT_FOUND" };
    }

    const isMatch = await bcrypt.compareSync(req.body.password, User.password);
    if (!isMatch) {
      throw { code: 403, message: "PASSWORD_WRONG" };
    }
    // Payload
    const payload = {
      id: User._id,
      role: User.role,
    };
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    // generate TOKEN

    return res.status(200).json({
      status: true,
      message: "LOGIN_SUCCES",
      fullname: User.fullname,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};
const refreshToken = async (req, res) => {
  try {
    if (!req.body.refreshToken) {
      throw { code: 428, message: "REFRESH_TOKEN_IS_REQUIRED" };
    }
    // VERIFY TOKEN
    const verify = await jsonwebtoken.verify(req.body.refreshToken, env.JWT_REFRESH_TOKEN_SECRET);
    if (!verify) {
      throw { code: 401, message: "REFRESH_TOKEN_INVALID" };
    }
    let payload = { _id: verify.id, role: verify.role };
    // GET token JWT
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return res.status(200).json({
      status: true,
      message: "REFRESH_TOKEN_SUCCES",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};
// Handler REGISTER
// Check email function
const checkEmail = async (req, res) => {
  try {
    const email = await isEmailExist(req.body.email);
    if (email) {
      throw { code: 409, message: "EMAIL_SUDAH_TERDAFTAR" };
    }

    res.status(200).json({
      status: true,
      message: "EMAIL_BELUM_TERDAFTAR",
    });
  } catch (err) {
    res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  try {
    if (!req.body.fullname) {
      throw { code: 428, message: " fullname Is Require" };
    }
    if (!req.body.email) {
      throw { code: 428, message: " E-mail Is Require" };
    }
    if (!req.body.password) {
      throw { code: 428, message: " Password Is Require" };
    }

    // Check If password Match
    if (req.body.password !== req.body.retype_password) {
      throw { code: 428, message: "PASSWORD_AND_PASSWORD_CONFIRMATION_MUST_MATCH" };
    }

    // Check Email exist
    const email = await isEmailExist(req.body.email);
    if (email) {
      throw { code: 409, message: "EMAIL_EXIST" };
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash,
    });
    const User = await newUser.save();

    if (!User) {
      throw { code: 500, message: "USER_REGISTER_FAILED" };
    }

    return res.status(200).json({
      status: true,
      message: "USER_REGISTER_SUCCESS",
      User,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { login, refreshToken, checkEmail, register };
