import { Router } from "express";
import Protected from "../../middleware/Protected";
import {
  addProduct,
  allProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../controller/admin/product.controller";
import uploader from "../../lib/multer";

const router = Router();

router.route("/all-products").get(Protected, allProducts);
router.route("/get/:id").get(Protected, getProduct);

router
  .route("/new-product")
  .post(uploader.array("products"), Protected, addProduct);
router
  .route("/update/:id")
  .put(uploader.array("products"), Protected, updateProduct);
router.route("/delete/:id").delete(Protected, deleteProduct);

export default router;
