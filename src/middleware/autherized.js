import { WebUser } from "../schema/model.js";

let authorized =(roles)=>{
    //roles=admin or superadmin
    return async (req,res,next)=>{
        try {
            let _id = req._id;
            let result=await WebUser.findById(_id)
            let tokenRole =result.role;
            if(roles.includes(tokenRole)){
                next();
            }else{
                res.status(403).json({
                    success:false,
                    message:"User not authorized.",
                })
            }
        } catch (error) {
            res.status(403).json({
                success:false,
                message:"User not authorized.",
            })
        }
    }
}
export default authorized;