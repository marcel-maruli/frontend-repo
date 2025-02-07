import { Router } from "express";
import { AuthController } from "../controllers/Auth";

const router = Router();
const { FindOneUser } = AuthController;

router.post("/login", FindOneUser);

export default router;
