import { Router } from "express";
import { handleSingleFileController } from "../controller/fileController.js";
import upload from "../utils/upload.js";

let fileRouter = Router();

fileRouter
  .route("/single")
  .post(upload.single("document"), handleSingleFileController);
export default fileRouter;
