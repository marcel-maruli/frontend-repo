import { Router } from "express";
import { UsersController } from "../controllers/User";
import { Authentication } from "../middleware/authentication";

const router = Router();
const { GetAllUser, AddUser, UpdateUser } = UsersController;

router.post("/add-user-data", AddUser);
router.get("/fetch-user-data", Authentication, GetAllUser);
router.put("/update-user-data/:email", Authentication, UpdateUser);

export default router;
