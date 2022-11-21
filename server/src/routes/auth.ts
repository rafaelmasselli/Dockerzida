import { Router } from "express";
import { authLoginController } from "../controller/auth/authLogin.controller";

const router = Router();

router.post("/", new authLoginController().handle);

export default router;
