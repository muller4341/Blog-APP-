import express from 'express';
import  commentController from '../controllers/createComment.js';
import verifyUser from '../utils/verifyUser.js';
const {createComment, getPostComments} = commentController;
const router = express.Router();

router.post('/create',verifyUser, createComment);
router.get('/getPostComments/:postId', getPostComments);

export default router;