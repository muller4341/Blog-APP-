import Comment from '../model/comment.js';

const commentController = async (req, res, next) => {
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
        await newComment.save();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export default commentController;