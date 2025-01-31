import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";

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
};
const signin =async(req, res, next) => {
    const {email, password} = req.body;  
    if (!email || !password||email==""||password=="") {
        next(errorHandler(400, 'All fields are required'));
        return;
    }
    try {
        const user = await User.findOne({email});
        if (!user) {
            next(errorHandler(404, 'User not found'));
            return;
        }   
        const validUser = bcrypt.compareSync(password, user.password);
        
        if (!validUser) {
            next(errorHandler(400, 'Invalid credentials'));
            return;
        }
        console.log('validUser =', validUser);
        console.log('user =', user);
        console.log('user._id =', user._id);
        console.log('isadmin =', user.isAdmin);
        const token = jwt.sign(  {id: user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET);
         const {password: pass, ...userInfo} = user._doc;    
            
        console.log( 'token =', token);
        console.log('userInfo =', userInfo);
        
        res.status(200)
        .cookie('access_token', token, {
                httpOnly: true,
                })
            .json(userInfo);





    }
    catch (error) {
        next(error);
    }


};

const google = async (req, res, next) => {
    const {name, email, googlePhotoUrl} = req.body;
    
    try {
        const user = await User.findOne({email});

        if (user) {
            const token = jwt.sign(  {id: user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;    
            res.status(200)
            .cookie('access_token', token, {
                httpOnly: true,
                })
                .json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8)
            + Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split('').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profile: googlePhotoUrl,
            });
            const user = await newUser.save();
            const token = jwt.sign(  {id: user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                })
                .json(rest);

        }
    }
    catch (error) {
        next(error);
    }
        

}


export {signup, signin , google};

