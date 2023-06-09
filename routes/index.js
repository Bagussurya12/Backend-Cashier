import express from "express";
import categories from "./categories.js";
import products from "./products.js";
import auth from "./auth.js";
import users from "./users.js";

var router = express.Router();

/* GET home page. */
router.use("/categories", categories);
router.use("/products", products);
router.use("/auth", auth);
router.use("/users", users);

export default router;
