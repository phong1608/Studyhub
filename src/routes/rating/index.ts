import {Router} from "express";

import ratingController from "../../controllers/rating.controller";
import authMiddleware from "../../middlewares/auth.middlware";


const router = Router()
router.get('/course/:courseId/page=:page',ratingController.getRatingByCourseId)
router.post('/add',authMiddleware.verifyUser,ratingController.addRating)
router.get('/instructor/',authMiddleware.verifyUser,ratingController.getRatingByInstructor)
export default router