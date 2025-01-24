import { Router } from "express";
import Protected from "../middleware/Protected";
import { getUser } from "../controller/user.controller";

const router = Router();

router.route("/get").get(Protected,getUser);

export default router;
