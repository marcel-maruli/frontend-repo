import { Router } from "express";
import { UsersController } from "../controllers/User";
import { AuthController } from "../controllers/Auth";

const router = Router();
const { AddUser } = UsersController;
const { FindOneUser } = AuthController;

router.post("/register", AddUser);
router.post("/login", FindOneUser);

export default router;
