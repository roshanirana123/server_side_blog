import jwt from "jsonwebtoken"
import { secretKey } from "../constant.js";

let isAuthenticated = async(req,res,next)=>{
        try {
            //get token from postman
        let tokenString= req.headers.authorization;
        let tokenArray=tokenString.split(" ")
        let token=tokenArray[1];
        //verify token
        let user= await jwt.verify(token,secretKey)
        req._id = user._id;
        next();
        } catch (error) {
            res.status(401).json({
                success:false,
                message:"Token not valid."
            })
        }
    }
 
    export default isAuthenticated;