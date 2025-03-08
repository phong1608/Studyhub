import { Router } from "express";
import courseController from "../../controllers/course.controller";
import authMiddleware from "../../middlewares/auth.middlware";
import multer from 'multer'
const router = Router()
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
router.post('/create',authMiddleware.verifyUser,upload.single('thumbnail'),courseController.addCourse)
router.get('/all',courseController.getAllCourse)
router.get('/:courseId',courseController.getCourse)
router.get('/instructor/:instructorId',courseController.getCourseByInstructorId)
router.post('/publish/:courseId',authMiddleware.verifyUser,courseController.publishCourse)
export default router
