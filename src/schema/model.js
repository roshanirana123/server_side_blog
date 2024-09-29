import { model } from "mongoose";
import webUserSchema from "./webUserSchema.js";
import blogSchema from "./blogSchema.js";

// export let Product = model("Product", productSchema);
export let WebUser = model("WebUser", webUserSchema);
// export let Review = model("Review",reviewSchema);
export let Blog =model("Blog",blogSchema)
