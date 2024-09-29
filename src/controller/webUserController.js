import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import {
  createWebUserService,
  deleteWebUserService,
  readSpecificWebUserService,
  readWebUserService,
  updateWebUserService,
} from "../service/webUserService.js";
import jwt from "jsonwebtoken";
import { expiryInfo, secretKey } from "../constant.js";
import { sendEmail } from "../utils/sendMail.js";
import { WebUser } from "../schema/model.js";

export const createWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    try {
      let data = req.body;
      /* data={
         "fullName":"roshani rana",
        "email":"ranaroshani16@gmail.com",
        "password":"Pass@12",
        "dob":"2003-3-10",
        "gender":"female",
        "role":"admin",
        "isVerifiedEmail":false,
        "password":hashPassword,
    } */
      let hashPassword = await bcrypt.hash(data.password, 10);
      data = {
        ...data,
        isVerifiedEmail: true,
        password: hashPassword,
      };
      let result = await createWebUserService(data);
      let info = {
        id: result._id,
      };
      //send email with link
      //1) generate token
      //link => frontend link
      //send mail

      let token = await jwt.sign(info, secretKey, expiryInfo);

      await sendEmail({
        from: "'hy🧑🏻‍🦰'<ranroshani16@gmail.com>",
        to: data.email,
        subject: "account create",

        html: `<h1>Your account has been created successfully.</h1>
        <a href="http://localhost:3000/verify-email?token=${token}">
        http://localhost:3000/verify-email?token=${token}
        </a>
        `,
      });
      res.status(201).json({
        success: true,
        message: "Web user created successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

export const verifyEmail = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;

    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    // console.log(token)
    //verify
    let infoObj = await jwt.verify(token, secretKey);
    // console.log(infoObj);
    let userId = infoObj.id;
    let result = await WebUser.findByIdAndUpdate(
      userId,
      { isVerifiedEmail: true },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "user verified successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await WebUser.findOne({ email: email });

    console.log(user);
    if (user) {
      if (user.isVerifiedEmail) {
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          let infoObj = {
            _id: user._id,
          };

          let token = await jwt.sign(infoObj, secretKey, expiryInfo);
          res.json({
            success: true,
            message: "user login successfully",
            data: token,
          });
        } else {
          let error = new Error("credential does not match.");
          throw error;
        }
      } else {
        let error = new Error("credential does not match.");
        throw error;
      }
    } else {
      let error = new Error("credential not found.");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    let _id = req._id;

    let result = await WebUser.findById(_id);
    res.status(200).json({
      success: true,
      message: "profile read successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to read profile",
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await WebUser.findByIdAndUpdate(_id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "Profile updated successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    console.log(req._id);
    let _id = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let data = await WebUser.findById(_id);
    console.log(data);
    let hashPassword = data.password;
    let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);
    if (isValidPassword) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);
      let result = await WebUser.findByIdAndUpdate(
        _id,
        { password: newHashPassword },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Password updated successfully.",
        data: result,
      });
    } else {
      let error = new Error("Credential does not match.");
      throw error;
    }
    console.log(data);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readAllUser = async (req, res, next) => {
  try {
    let result = await WebUser.find({});
    res.status(200).json({
      success: true,
      message: "All user read successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const readSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await WebUser.findById(id);
    res.status(200).json({
      success: true,
      message: "User read successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await WebUser.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "User updated successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await WebUser.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    let email = req.body.email;
    let result = await WebUser.findOne({ email: email });
    if (result) {
      let infoObj = {
        _id: result._id,
      };
      let token = await jwt.sign(infoObj, secretKey, expiryInfo);
      await sendEmail({
        from: "'Roshani👧'<ranaroshani16@gmail.com>",
        to: email,
        subject: "Reset Password",
        html: `<h1>Please click the given link to reset your password.</h1>
        <a href="http://localhost:3000/admin/reset-password?token=${token}">
        http://localhost:3000/admin/reset-password?token=${token}
        </a>
        `,
      });
      res.status(200).json({
        success: true,
        message: "Link has been sent to your email for reset your password.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "email does not exist",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    let _id=req._id;
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result = await WebUser.findByIdAndUpdate(
      _id,
      { password: hashPassword },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Password reset successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};












// export const readWebWebUserController=expressAsyncHandler(async(req,res,next)=>{
//   let result = await readWebUserService(req.body);
// res.json({
//   success: true,
//   message:"result read successfully.",
//   result: result,
// });
// });

// export const readSpecificWebUserController=expressAsyncHandler(async(req,res,next)=>{
//   let result =await readSpecificWebUserService(req.params.id)
//   res.json({
//       success:true,
//       message:"result read successfully.",
//       result:result,
//   })

// })

// export const updateWebUserController=expressAsyncHandler(async(req,res,next)=>{
//   let result=await updateWebUserService(req.params.id,req.body) /* (id,data,:{new:true}) */
//   res.json({
//       success:true,
//       message:"result Updated successfully.",
//       result:result,
//   });
// })

// export const deleteWebUserController=expressAsyncHandler(async(req,res,next)=>{
//   let result=await deleteWebUserService(req.params.id)
//   res.json({
//       success:true,
//       message:"result deleted successfully.",
//       result:result,
//   })
// })
