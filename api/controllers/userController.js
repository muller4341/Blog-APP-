import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../model/user.model.js';


const updateUser =async (req, res,next) => {

    console.log("userId", req.params.userId); 
    console.log("req.user.id", req.user.id);
    if(req.user.id!==req.params.userId){

        return next(errorHandler(403, 'you are not allowed to update this account,you can update only your account'));

    }
    if(req.body.password){
    if ( req.body.password.length<6) {
        return next(errorHandler(400, 'password must be at least 6 characters long'));
    
    }
    req.body.password = bcrypt.hashSync(req.body.password , 10);
}

        if(req.body.username){
    if (req.body.username<5) {
        return next(errorHandler(400, 'username must be at least 5 characters long'));
    }
    
    if ( req.body.username.includes(' ')) {
        return next(errorHandler(400, 'username must not contain spaces'));
    }
    if (req.body.username!==req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'username must be in lowercase'));
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, 'username must contain only letters and numbers'));
    }
}
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set:{
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                profilePicture: req.body.profilePicture,

            },
    }, {new: true});
    const {password, ...rest} = updatedUser._doc
    console.log("password rest", rest)
    res.status(200).json( rest);
    
}
catch (error) {
    console.log('error', error);
    next(error);
}

}
;
const deleteUser = async (req, res, next) => {  

    if(req.user.id!==req.params.userId){
        return next(errorHandler(403, 'you are not allowed to delete this account,you can delete only your account'));

    }
        try {
            await User.findByIdAndDelete(req.params.userId);
            res.status(200).json('Account has been deleted successfully');
        }
        catch (error) {
            next(error);
        }
        

}
;

const signOut = ( req, res, next) => {
      try {
        res.clearCookie('token')
        res.status(200)
        .json('user signed out successfully');                                  
       }
         catch (error) {
              next(error);
         }
}

export {updateUser , deleteUser, signOut}

// Compare this snippet from client/src/pages/Projects/Projects.jsx:
