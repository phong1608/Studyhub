import { Router } from "express";
import authMiddlware from "../../middlewares/auth.middlware";
import lessonController from "../../controllers/lesson.controller";
import multer from 'multer'
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const router = Router();
router.post('/create',authMiddlware.verifyUser,upload.single('videoUrl'),lessonController.addLesson)
router.get('/:lessonId',lessonController.getLessonById)
router.get('/course/:courseId',lessonController.getCourseFirstLesson)
export default router
