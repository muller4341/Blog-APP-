import express from 'express';
import  commentController from '../controllers/createComment.js';
import verifyUser from '../utils/verifyUser.js';
const {createComment, getPostComments, likeComment, editComment} = commentController;
const router = express.Router();

router.post('/create',verifyUser, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyUser, likeComment);
router.put('/editComment/:commentId', verifyUser, editComment);


export default router;