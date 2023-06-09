import express from "express";
import { userHandler, postUserHandler, updateUserHandler, getUserByIdHandler, deleteUserHandler } from "../handler/UserHandler.js";
var router = express.Router();

router.get("/", userHandler);
router.post("/", postUserHandler);
router.put("/:id", updateUserHandler);
router.get("/:id", getUserByIdHandler);
router.delete("/:id", deleteUserHandler);

export default router;
