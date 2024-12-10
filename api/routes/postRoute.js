
import  express from 'express';
import verifyUser from '../utils/verifyUser.js'
import  {createPost,getPosts} from '../controllers/createPost.js';
const router= express.Router();

router.post('/create', verifyUser,createPost)
router.get('/getposts', getPosts)


export default router;
