import { Router } from "express";
import userController from "../../controllers/user.controller";
import authMiddleware from "../../middlewares/auth.middlware";
import multer from 'multer'
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const router =  Router();

router.post('/signup',userController.signUp)
router.post('/signin',userController.signIn)
router.get('/signout',userController.signOut)
router.post('/instructor/create',authMiddleware.verifyUser,userController.addInstructor)
router.get('/instructor/:id',userController.getInstructor)
router.get('/me',authMiddleware.verifyUser,userController.getUserCredentials)
router.put('/me',authMiddleware.verifyUser,upload.single('thumbnail'),userController.updateUserProfile)
export default router
