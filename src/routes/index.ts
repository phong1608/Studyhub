import userRouter from './user/index'
import { Router } from 'express'
import courseRouter from './course/index'
import sectionRouter from './section/index'
import lessonRouter from './lesson/index'
import commentRouter from './comment/index'
import categoryRouter from './category/index'
import cartRouter from './cart/index'
import enrollmentRouter from './enrollment/index'
import ratingRouter from './rating/index'
import discountRouter from './discount/index'
import paymentRouter from './payment/index'
const router = Router()

router.use('/user',userRouter)
router.use('/course',courseRouter)
router.use('/section',sectionRouter)
router.use('/lesson',lessonRouter)
router.use('/comment',commentRouter)
router.use('/category',categoryRouter)
router.use('/cart',cartRouter)
router.use('/enrollment',enrollmentRouter)
router.use('/rating',ratingRouter)
router.use('/discount',discountRouter)
router.use('/payment',paymentRouter)
export default router
