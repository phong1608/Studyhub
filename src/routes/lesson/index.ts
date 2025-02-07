import { Router } from "express";
import { verifyUser } from "../../middlewares/auth.middlware";
import lessonController from "../../controllers/lesson.controller";

const router = Router();
router.post('/create',verifyUser,lessonController.addLesson)
router.get('/:lessonId',lessonController.getLessonById)
export default router
