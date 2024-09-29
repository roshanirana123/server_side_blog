import { config } from "dotenv";
config();
export const expiryInfo = {
  expiresIn: "365d",
};

export let email = process.env.EMAIL;
export let password = process.env.PASSWORD;
export let secretKey = process.env.SECRET_KEY;
export let mongodbUrl = process.env.MONGODB_URL;
export let url = process.env.URL;
