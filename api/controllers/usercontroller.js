import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../model/user.model.js';
const test= ( req, res)=> {
    res.send('APi test route is working!')

}

const updateUser =async (req, res,next) => {

    console.log("userId", req.params.userId); 
    console.log("req.user.id", req.user.id);
    if(req.user.id!==req.params.userId){

        return next(errorHandler(403, 'you are not allowed to update this account,you can update only your account'));

    }
    console.log('req.body.password', req.body.password)
    console.log('req.body.username', req.body.username)
    console.log('req.body.email', req.body.email)
    if (req.body.password.length<6) {
        return next(errorHandler(400, 'password must be at least 6 characters long'));
    
    }
    req.body.password = bcrypt.hashSync(req.body.password , 10);

    if (req.body.username<5) {
        return next(errorHandler(400, 'username must be at least 5 characters long'));
    }
    
    if (req.body.username && req.body.username.includes(' ')) {
        return next(errorHandler(400, 'username must not contain spaces'));
    }
    if ( req.body.username && req.body.username!==req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'username must be in lowercase'));
    }
    if(req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, 'username must contain only letters and numbers'));
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
    res.status(200).json( updateUser);
    
}
catch (error) {
    console.log('error', error);
    next(error);
}

}
;
export { test , updateUser}

// Compare this snippet from client/src/pages/Projects/Projects.jsx:
