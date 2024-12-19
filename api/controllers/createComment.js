import Comment from '../model/comment.js';

const createComment = async (req, res, next) => {
    try {
        const { postId , content, userId} = req.body;
        console.log('postId:', postId);
        console.log('content:', content);
        console.log('req.user.id:', req.user.id);
        console.log('userId:', userId);
        if(userId!== req.user.id) {
            res.status(401).json({ message: 'you are not allowed to comment ' });
            return;
        }
        const newComment = new Comment({
            postId,
            userId,
            content,
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getPostComments = async (req, res, next) => {
    try {
        const comments= await Comment.find({postId: req.params.postId}).sort({createdAt: -1});
        res.status(200).json(comments);
    
    }
    catch (error) {
        next(error);
    }

}
const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment) {
    
                res.status(404).json({ message: 'Comment not found' });
                return;
        }
        
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1) {
            comment.numberOfLikes+=1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes-=1;
            comment.likes.splice(userIndex,1);
        }
     await comment.save(); 
        res.status(200).json(comment);
    
    } catch (error) {
        next(error);
        
    }
}




export default {createComment, getPostComments, likeComment};