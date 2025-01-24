import { Router } from "express";
import Protected from "../middleware/Protected";
import {
  capturePayment,
  createOrder,
  getAllOrderByAdmin,
  getAllOrderByUser,
  getOrderDetailsByAdmin,
  getOrderDetailsByUser,
  updateOrderStatus,
} from "../controller/order.controller";

const router = Router();

router.route("/create-order").post(Protected, createOrder);
router.route("/capture-order").post(Protected, capturePayment);

router.route("/list").get(Protected, getAllOrderByUser);
router.route("/details/:orderId").get(Protected, getOrderDetailsByUser);
router.route("/admin-list").get(Protected, getAllOrderByAdmin);
router.route("/admin-details/:orderId").get(Protected, getOrderDetailsByAdmin);
router.route("/update-order-status/:id").post(Protected, updateOrderStatus);

export default router;
