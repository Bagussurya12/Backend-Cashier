import express from "express";
import { getAllProductHandler, postProductHandler } from "../handler/ProductHandler.js";
var router = express.Router();

/* GET users listing. */

router.post("/", postProductHandler);
router.get("/", getAllProductHandler);

export default router;
