// import { Router } from "express";
// import {
//   createBlogController,
//   deleteBlogController,
//   readBlogController,
//   readSpecificBlogController,
//   updateBlogController,
// } from "../controller/blogController.js";
// import validation from "../middleware/validation.js"; // Ensure this is uncommented and imported correctly
// import blogValidation from "../validation/blogValidation.js";

// let blogRouter = Router();

// blogRouter
//   .route("/") //localhost:8000/blog
//   .post(validation(blogValidation), createBlogController) // Validate before creating a new blog post
//   .get(readBlogController); // Read all blog posts

// blogRouter
//   .route("/:id") //localhost:8000/blog/:id
//   .get(readSpecificBlogController) // Get a specific blog by ID
//   .patch(updateBlogController) // Update a blog by ID
//   .delete(deleteBlogController); // Delete a blog by ID

// export default blogRouter;

import { Router } from "express";
import {
  createBlogController,
  deleteBlogController,
  readBlogController,
  readSpecificBlogController,
  updateBlogController,
} from "../controller/blogController.js";

let blogRouter = Router();

blogRouter
  .route("/") //localhost:8000/blog
  .post(createBlogController) // Validate before creating a new blog post
  .get(readBlogController); // Read all blog posts

blogRouter
  .route("/:id") //localhost:8000/blog/:id
  .get(readSpecificBlogController) // Get a specific blog by ID
  .patch(updateBlogController) // Update a blog by ID
  .delete(deleteBlogController); // Delete a blog by ID

export default blogRouter;
