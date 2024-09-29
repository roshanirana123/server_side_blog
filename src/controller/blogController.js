import expressAsyncHandler from "express-async-handler";
import {
  createBlogService,
  deleteBlogService,
  readBlogService,
  readSpecificBlogService,
  updateBlogService,
} from "../service/BlogService.js";

export const createBlogController = expressAsyncHandler(
  async (req, res, next) => {
    try {
      let result = await createBlogService(req.body);
      res.json({
        success: true,
        message: "Blog created successfully.",
        result: result,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(400).json({
        success: false,
        message: "Failed to create blog.",
        error: error.message,
      });
    }
  }
);

export const readBlogController = expressAsyncHandler(
  async (req, res, next) => {
    try {
      let result = await readBlogService({});
      res.json({
        success: true,
        message: "Blogs fetched successfully.",
        result: result,
      });
    } catch (error) {
      console.error("Error reading blogs:", error);
      res.status(400).json({
        success: false,
        message: "Failed to fetch blogs.",
        error: error.message,
      });
    }
  }
);

export const readSpecificBlogController = expressAsyncHandler(
  async (req, res, next) => {
    try {
      let result = await readSpecificBlogService(req.params.id);
      res.json({
        success: true,
        message: "Blog fetched successfully.",
        result: result,
      });
    } catch (error) {
      console.error("Error reading specific blog:", error);
      res.status(400).json({
        success: false,
        message: "Failed to fetch blog.",
        error: error.message,
      });
    }
  }
);

export const updateBlogController = expressAsyncHandler(
  async (req, res, next) => {
    try {
      let result = await updateBlogService(req.params.id, req.body, {
        new: true,
      });
      res.json({
        success: true,
        message: "Blog updated successfully.",
        result: result,
      });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(400).json({
        success: false,
        message: "Failed to update blog.",
        error: error.message,
      });
    }
  }
);

export const deleteBlogController = expressAsyncHandler(
  async (req, res, next) => {
    try {
      let result = await deleteBlogService(req.params.id);
      res.json({
        success: true,
        message: "Blog deleted successfully.",
        result: result,
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(400).json({
        success: false,
        message: "Failed to delete blog.",
        error: error.message,
      });
    }
  }
);
