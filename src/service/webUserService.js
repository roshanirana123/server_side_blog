import { WebUser } from "../schema/model.js";
export let createWebUserService = async (data) => {
  return await WebUser.create(data);
};

export let readWebUserService = async () => {
  return await WebUser.find({});
};
export let readSpecificWebUserService = async (id) => {
  return await WebUser.findById(id);
};
export let updateWebUserService = async (id, data) => {
  return await WebUser.findByIdAndUpdate(id, data, { new: true });
};
export let deleteWebUserService = async (id) => {
  return await WebUser.findByIdAndDelete(id);
};

export let readWebUserServiceByChoice = async (filter) => {
  return await WebUser.findOne(filter);
};
