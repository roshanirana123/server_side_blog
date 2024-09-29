import { Router } from "express";
import {
  createWebUserController,
  deleteSpecificUser,
  forgotPassword,
  loginUser,
  myProfile,
  readAllUser,
  readSpecificUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateSpecificUser,
  verifyEmail,
} from "../controller/webUserController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorized from "../middleware/autherized.js";

const webUserRouter = Router();
webUserRouter
  .route("/")
  .post(createWebUserController)
  .get(isAuthenticated, authorized(["admin", "superadmin"]), readAllUser)
  .get(readAllUser);
//
webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/login").post(loginUser);
webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);
webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);
webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);

webUserRouter.route("/forgot-password").post(forgotPassword);
webUserRouter.route("/reset-password").patch(isAuthenticated, resetPassword);

webUserRouter
  .route("/:id")
  .get(isAuthenticated, authorized(["admin", "superadmin"]), readSpecificUser)
  .patch(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    updateSpecificUser
  )
  .delete(isAuthenticated, authorized(["superadmin"]), deleteSpecificUser);

// webUserRouter
//   .route("/:id")

export default webUserRouter;
