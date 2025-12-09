import User from "../models/user.model.js";

export const getCurrentUser = async (req , res) => {
    try {

        const user =   await User.findById(req.userId).select("-password");


        if( !user){
            return res.status(404).json({message:"No user found"});
        }

        return res.status(200).json({message:"User found" , user})

        
    } catch (error) {
        return res.status(500).json({message:`Get current user error : ${error}`})
    }
}