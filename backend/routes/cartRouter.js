import express from "express";
import { addOrUpdateCartItem, getCart } from "../controls/cartControl.js";

const router = express.Router();

router.route("/").post(addOrUpdateCartItem);
router.route("/").get(getCart);

export default router;
