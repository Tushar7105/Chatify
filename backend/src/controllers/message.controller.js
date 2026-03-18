import User from "../models/User";

export const getContacts = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password");
        return res.status(200).json(filteredUsers);
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal server error"});
    }
}