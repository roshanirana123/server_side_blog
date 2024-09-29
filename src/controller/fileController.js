import expressAsyncHandler from "express-async-handler";

export const handleSingleFileController = expressAsyncHandler(
  async (req, res, next) => {
    try {
      let link = `http://localhost:8000/${req.file.filename}`;
      res.status(200).json({
        success: true,
        message: "file uploaded successfully",
        result: link,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "file uploaded failed",
        error: error.message,
      });
    }
  }
);
