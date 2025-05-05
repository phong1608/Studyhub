import { Router } from "express";
import authMiddlware from "../../middlewares/auth.middlware";
import lessonController from "../../controllers/lesson.controller";
import multer from 'multer'
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const router = Router();
router.post('/update/:id',authMiddlware.verifyUser,lessonController.updateLesson)
router.post('/create',authMiddlware.verifyUser,upload.single('videoUrl'),lessonController.addLesson)
router.get('/:id',lessonController.getLessonById)
router.get('/course/:courseId',lessonController.getCourseFirstLesson)
export default router
