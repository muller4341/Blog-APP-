import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from "../utils/error.js";

const signup = async (req, res, next) => {
const {username, email, password} = req.body;   
if (!username || !email || !password||username==""||email==""||password=="") {

    next(errorHandler(400, 'All fields are required'));
    return;
   
}
if (password.length < 6) {
    next(errorHandler(400, 'Password must be at least 6 characters long'));
    return;
}
if (typeof password !== 'string' || password === "") {
    next(errorHandler(400, 'Password must be a string'));   
    return;
}


     const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt); 
    const newUser = new User(
        {username,
        email,
         password: hashPassword
        });


    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) { 
        next(error)
    }
}

export {signup};

