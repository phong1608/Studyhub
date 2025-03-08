import { Router } from "express";
import userController from "../../controllers/user.controller";
import authMiddleware from "../../middlewares/auth.middlware";
const router =  Router();

router.post('/signup',userController.signUp)
router.post('/signin',userController.signIn)
router.post('/signout',userController.signOut)
router.post('/instructor/create',authMiddleware.verifyUser,userController.addInstructor)
router.get('/instructor/:id',userController.getInstructor)
router.get('/me',authMiddleware.verifyUser,userController.getUserCredentials)
export default router
