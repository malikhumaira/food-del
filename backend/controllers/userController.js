import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//we will create 2 funcs 1) login user 2)register user & then we will export an {}
// login user
const loginUser = async(req, res)=> {
    const {email, password} = req.body
    
    try {
        const user = await userModel.findOne({email})
        if(!user) {
          return res.json({success:false, message:"User not found"})  
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.json({success:false, message:"email or password not correct"})
            } else {
                const token = createToken(user._id)
                res.json({success:true, token})
            }
        }
    } catch(error) {
        console.log(error);
        return res.json({success:false, message:"Error"})
    }
}

const createToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async(req, res) => {
    const {name, email, password} =req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({success: false, message:"User already exists"})
        }

        // validating email format and strong password
        if (!validator.isEmail(email)){
            return res.json({success: false, message:"Please enter a valid email"})
        }

        // verifying password's strength
        if (password.length<8){
            return res.json({success:false, message: "Password must contain minimum 8 characters"})
        } 
        // if above all steps are clear then we will hash user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating new user 
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch(error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}
 export {loginUser, registerUser}