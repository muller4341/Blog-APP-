import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
const signup = async (req, res) => {

const {username, email, password} = req.body;   
if (!username || !email || !password||username==""||email==""||password=="") {
    return res.status(400).json({message: "All fields are required"});

}


    const hashPassword = bcrypt.hashSync(password, 10); 
    const newUser = new User(
        {username,
        email,
         password: hashPassword
        });


    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export {signup};

