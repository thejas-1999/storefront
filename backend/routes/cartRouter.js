import express from "express";
import { addOrUpdateCartItem, getCart } from "../controls/cartControl.js";

const router = express.Router();

router.route("/").get(getCart).post(addOrUpdateCartItem);

export default router;
