import {Router} from "express";
import cartController from "../../controllers/cart.controller";
import authMiddleware from "../../middlewares/auth.middlware";
const router = Router()
router.get('/user/get',authMiddleware.verifyUser,cartController.getUserCart)
router.post('/add/:courseId',authMiddleware.verifyUser,cartController.addToCart)
router.post('/checkout',authMiddleware.verifyUser,cartController.cartCheckout)
router.post('/delete/:courseId',authMiddleware.verifyUser,cartController.removeFromCart)
export default router