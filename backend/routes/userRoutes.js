import { Router } from "express";
//import multer from "multer"
import {
  createUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
  userLogin,
  userLogout,
  getUserByUsername,
  getUserByEmail,
  getUserData,
} from "../controller/userController.js";
import { userValidationSchema } from "../models/userValidationModel.js";
import { updateUserValidationSchema } from "../models/updateUserValidationSchema.js";
import { validator } from "../middleware/validator.js";
import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/")
  .post(userValidationSchema, validator, createUser)
  .get(getUserData);
router.route("/:id")
  .get(getUserByID)
  .delete(isAuth, deleteUserByID)
  .patch(isAuth, updateUserByID);
router.route("/edit/:id")
  .patch(isAuth, updateUserValidationSchema, validator, updateUserByID);
router.route("/password/:id")
  .patch(isAuth, userValidationSchema, validator, updateUserByID);
router.route("/login")
  .post(userLogin);
router.route("/logout")
  .post(userLogout);
router.route("/username/:username")
  .get(getUserByUsername);
router.route("/email/:email")
  .get(getUserByEmail);
router.route("/userdata/:username")
  .get(getUserData);

export default router;