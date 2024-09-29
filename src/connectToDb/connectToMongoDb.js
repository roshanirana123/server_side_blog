import mongoose from "mongoose";
import { mongodbUrl } from "../constant.js";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(mongodbUrl); 
    console.log("application is connected to mongodb database successfully.");
  } catch (error) {
    console.log(error.message);
  }
};
export default connectToMongoDb;
