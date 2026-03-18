import Message from "../models/Message";
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

export const getMessagesByUserId = async (req, res)=>{
    try{
        const {id: receiverId} = req.params;
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or : [
                {senderId : loggedInUserId, receiverId : receiverId},
                {senderId : receiverId, receiverId : loggedInUserId}
            ]
        });

        res.status(200).json(messages);
        
    }catch(error){
        console.log("error in getMessagesByUserId", error.message);
        return res.status(500).json({message : "Internal server error"});
    }
}