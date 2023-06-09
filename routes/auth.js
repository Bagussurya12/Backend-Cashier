import express from "express";
import { login, register, refreshToken, checkEmail } from "../handler/AuthHandler.js";
var router = express.Router();

/* GET users listing. */

router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", refreshToken);
router.post("/check-email", checkEmail);

export default router;
