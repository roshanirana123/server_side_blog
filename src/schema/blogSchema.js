import { Schema } from "mongoose";

let blogSchema = new Schema({
    title: {
        type: String,
        required: true, // Ensure title is required
    },
    description: {
        type: String,
        required: true, // Ensure topic is required
    },
    blogImage: {
        type: String, // URL of the blog image
        required: true, // Ensure image is provided
    }
  
});

export default blogSchema;
