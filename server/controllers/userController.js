const User = require('../model/User');
const bcrypt = require('bcrypt');
const Blog = require('../model/Blog');
 const getUserDetails = async(req,res) => {
    try {
            const userid = req.userid;
            const user = await  User.findById(userid).select({password:0});
            if(!user){
                return res.status(404).json({error : 'User not found'})
            }
            res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
    }

const updateUserDetails = async (req, res) => {
    try {
        const userid = req.userid;
        const { firstname, lastname, username, password, email } = req.body;

        // const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { firstname, lastname, username,  email },
            { new: true, projection: { password: 0, _id: 0, __v: 0 } }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
       
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to update" });
    }
};

 const deleteUser = async(req,res)=>{
        try {
            const userid = req.userid;
            const user = await User.findById(userid);
            if(!user){
                return res.status(404).json({error : 'User not found'})
            }
            await Blog.deleteMany({userid:userid});
           
            await User.deleteOne({_id:userid});
          
            res.status(200).json({message : 'User deleted successfully'})
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
 }
const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find().select({password:0});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error : error.message})
    }}
 module.exports = {getUserDetails,updateUserDetails,deleteUser,getAllUsers}