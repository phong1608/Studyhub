import { Router } from "express";
import userController from "../../controllers/user.controller";
import {verifyUser} from "../../middlewares/auth.middlware";
const router =  Router();

router.post('/signup',userController.signUp)
router.post('/signin',userController.signIn)
router.post('/instructor/create',verifyUser,userController.addInstructor)
router.get('/instructor/',verifyUser,userController.getInstructor)
export default router
