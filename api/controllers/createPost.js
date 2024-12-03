import { errorHandler } from "../utils/error.js";
import Post from "../model/postModel.js";

const createPost = async (req, res, next) => {
  console.log("admin of post", req.user.isAdmin)
  console.log("req.user", req.user)

  if(!req.user?.isAdmin) {
    return next(errorHandler(403, 'you are not allowed to create a post'));
  }
  if (!req.body.title||req.body.content) {
    return next(errorHandler(400, 'title is required'));

  }
  const slug = req.body.title.split('').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ... req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }  
}
export default createPost;
