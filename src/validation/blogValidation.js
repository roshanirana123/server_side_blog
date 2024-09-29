// import Joi from "joi";

// const blogValidation = Joi.object({
//   title: Joi.string().min(3).max(100).required().messages({
//     "string.base": "Title must be a string",
//     "string.empty": "Title cannot be empty",
//     "string.min": "Title must have at least 3 characters",
//     "string.max": "Title must not exceed 100 characters",
//     "any.required": "Title is required",
//   }),
//   description: Joi.string().min(5).max(500).required().messages({
//     "string.base": "Description must be a string",
//     "string.empty": "Description cannot be empty",
//     "string.min": "Description must have at least 5 characters",
//     "string.max": "Description must not exceed 500 characters",
//     "any.required": "Description is required",
//   }),
//   blogImage: Joi.string().uri().required().messages({
//     "string.uri": "Blog image must be a valid URL",
//     "any.required": "Blog image is required",
//   }),
// });

// export default blogValidation;
