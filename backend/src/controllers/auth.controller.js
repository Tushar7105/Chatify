import { generateToken } from "../lib/utils";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const signup = async (req, res)=>{
    try{
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are required"});
        }
        
        if(password.length < 6){
            return res.status(400).json({message : "Password must be atleast 6 character long"});
        }
        
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if(!emailRegex.test(email)){
            return res.status(400).json({message : "Invalid email address provided"});
        }

        const user = await User.findOne({email : email});
        if(user) return res.status(400).json({message : "Email already exisit"});

        const salt = await bcrypt.getSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName : fullName,
            email : email,
            password : hashedPassword
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })
        }else{
            res.status(400).json({message : "Invalid data"});
        }
    }catch(error){
        console.log("Error in signup controller");
        res.status(500).json({message : "internal server error"});
    }
}