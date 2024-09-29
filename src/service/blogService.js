import { Blog } from "../schema/model.js";
export let createBlogService =async(data)=>{
    return await Blog.create(data)
};

export let readBlogService = async()=>{
    return await Blog.find({});
}
export let readSpecificBlogService= async(id)=>{
    return await Blog.findById(id)
}
export let updateBlogService= async(id,data)=>{
    return await Blog.findByIdAndUpdate(id,data,{new:true,})
}
export let deleteBlogService= async(id)=>{
    return await Blog.findByIdAndDelete(id)
}