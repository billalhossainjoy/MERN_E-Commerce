import { Router } from "express";
import Protected from "../middleware/Protected";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../controller/address.controller";

const router = Router();

router.route("/add-address").post(Protected, addAddress);
router.route("/edit-address/:addressId").put(Protected, editAddress);
router.route("/fetch-all-address").get(Protected, fetchAllAddress);
router.route("/delete-address/:addressId").delete(Protected, deleteAddress);

export default router;
