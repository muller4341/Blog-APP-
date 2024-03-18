import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://www.travelpayouts.com/blog/wp-content/uploads/2021/02/blog-images.png'
    },
    category: {
        type: Array,
        default:'unCategorized'
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
},

{timestamps: true}
);

const Post = mongoose.model('Post', postSchema);
export default Post;
// Compare this snippet from api/controllers/usercontroller.js: 