import { Router } from "express";
import {
  addToCart,
  deleteCart,
  fetchCart,
  updateCart,
} from "../controller/cart/cart.controller";
import Protected from "../middleware/Protected";
const router = Router();

router.route("/addtocart").post(Protected, addToCart);
router.route("/fetchcarts/:userId").get(Protected, fetchCart);
router.route("/updatecart").post(Protected, updateCart);
router.route("/deletecart/:id").post(Protected, deleteCart);

export default router;
