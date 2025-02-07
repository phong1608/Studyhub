import userRouter from './user/index'
import { Router } from 'express'
import courseRouter from './course/index'
import sectionRouter from './section/index'
import lessonRouter from './lesson/index'
const router = Router()

router.use('/user',userRouter)
router.use('/course',courseRouter)
router.use('/section',sectionRouter)
router.use('/lesson',lessonRouter)
export default router
