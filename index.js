import express, { json } from "express";
import connectToMongoDb from "./src/connectToDb/connectToMongoDb.js";
import webUserRouter from "./src/routes/webUserRoute.js";
import cors from "cors";
import blogRouter from "./src/routes/blogRoute.js";
import fileRouter from "./src/routes/fileRouter.js";

let expressApp = express();
expressApp.use(cors());

expressApp.use(express.static("./public"));
connectToMongoDb();
expressApp.use(json());

expressApp.use("/web-users", webUserRouter);
expressApp.use("/blog", blogRouter);
expressApp.use("/file", fileRouter);

expressApp.listen(8000, () => {
  console.log("application listening at port 8000");
});
