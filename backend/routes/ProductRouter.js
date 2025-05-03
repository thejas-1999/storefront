import express from "express";
import { getProducts } from "../controls/productControl.js";

const router = express.Router();

router.route("/").get(getProducts);

export default router;
