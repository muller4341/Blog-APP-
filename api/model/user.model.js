import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://tse3.mm.bing.net/th?id=OIP.d14ED9H9QeOn7Uka5EpxVwHaHa&pid=Api&P=0&h=220https://cdn.dribbble.com/users/2364329/screenshots/5930135/aa.jpg',
    },      

},
{timestamps: true}
);

const User = mongoose.model('User', userSchema);
export default User;
