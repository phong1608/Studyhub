import { Router } from "express";
import courseController from "../../controllers/course.controller";
import { verifyUser } from "../../middlewares/auth.middlware";
const router = Router()

router.post('/create',verifyUser,courseController.addCourse)

router.get('/:courseId',courseController.getCourse)
export default router
