import { Router } from "express";
import courseController from "../../controllers/course.controller";
import authMiddleware from "../../middlewares/auth.middlware";
import multer from 'multer'
const router = Router()
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
router.get('/me',authMiddleware.verifyUser,courseController.getIntructorCourse)
router.post('/create',authMiddleware.verifyUser,upload.single('thumbnail'),courseController.addCourse)
router.get('/all',courseController.getAllCourse)
router.get('/:courseId',courseController.getCourse)
router.get('/instructor/:instructorId',courseController.getCourseByInstructorId)
router.post('/publish/:courseId',authMiddleware.verifyUser,courseController.publishCourse)
router.get('/category/:categoryId/page=:page',courseController.getCourseByCategoryId)
router.get('/rating/:courseId',courseController.getCourseWithRating)
router.get('/search/q=:search/page=:page',courseController.getCourseBySearch)
router.put('/update/:courseId',authMiddleware.verifyUser,upload.single('thumbnail'),courseController.updateCourseByCourseId)
export default router
