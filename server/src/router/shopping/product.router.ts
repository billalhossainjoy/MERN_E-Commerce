import { Router } from "express";
import { FetchAllProducts, FetchProduct, searchProduct } from "../../controller/shopping/product.controller";

const router = Router();

router.route("/products").get(FetchAllProducts);
router.route("/product/:id").get(FetchProduct);
router.route("/search/:keyword").get(searchProduct)

export default router;
