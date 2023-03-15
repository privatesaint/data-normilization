import { Router } from "express";
import * as UserController from "../../controllers/UserController";

const router = Router();

router.post("/user", UserController.signUp);
router.get("/search", UserController.filterWord);

export default router;
