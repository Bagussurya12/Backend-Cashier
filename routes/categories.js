import express from "express";
import { getAllCategoryHandler, postCategoryHandler } from "../handler/CategoryHandler.js";
var router = express.Router();

/* GET users listing. */
router.get("/", getAllCategoryHandler);
router.post("/", postCategoryHandler);

export default router;
