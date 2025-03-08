import {Router} from "express";
import enrollmentController from "../../controllers/enrollment.controller";
import authMiddlware from "../../middlewares/auth.middlware";

const router = Router()
router.get('/user/get',authMiddlware.verifyUser,enrollmentController.getUserEnrollment)
export default router