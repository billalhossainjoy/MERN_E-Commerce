import { Router } from "express";
import { FetchAllProducts, FetchProduct } from "../../controller/shopping/product.controller";

const router = Router();

router.route("/products").get(FetchAllProducts);
router.route("/product/:id").get(FetchProduct);

export default router;
