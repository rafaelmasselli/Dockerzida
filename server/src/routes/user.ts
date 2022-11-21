import { Router } from "express";
import { createUserController } from "../controller/user/createUser.controller";

import { authHeader } from "../middleware/auth";

import { findUniqueUserController } from "../controller/user/findUniqueUser.controller";
import { findManyUserController } from "../controller/user/findManyUser.controller";
import { usernameValidation } from "../middleware/usernameValidation";
import { passwordValidation } from "../middleware/passwordValidation";
import {
  updaterUsernameUserController,
  updatePasswordUserController,
} from "../controller/user/updateUser.controller";

const router = Router();

const valideToken = new authHeader().handle;
const UsernameValidation = new usernameValidation().handle;
const PasswordValidation = new passwordValidation().handle;

router.get("/", valideToken, new findUniqueUserController().handle);
router.get("/find-many", valideToken, new findManyUserController().handle);
router.post(
  "/create",
  UsernameValidation,
  PasswordValidation,
  new createUserController().handle
);
router.put(
  "/update/username",
  valideToken,
  UsernameValidation,
  new updaterUsernameUserController().handle
);

router.put(
  "/update/password",
  valideToken,
  PasswordValidation,
  new updatePasswordUserController().handle
);

export default router;
