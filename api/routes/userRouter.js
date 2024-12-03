import express from 'express'
import {  updateUser ,deleteUser, signOut} from '../controllers/userController.js'
import verifyUser from '../utils/verifyUser.js'
const router = express.Router()

 router.put('/update/:userId',verifyUser,updateUser)  
 router.delete('/delete/:userId',verifyUser, deleteUser)
 router.post('/signout',  signOut)
 

export default router