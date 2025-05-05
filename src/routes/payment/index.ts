import { Router } from "express";
import PaymentController from "../../controllers/payment.controller";
import authMiddleware from "../../middlewares/auth.middlware";



const router = Router()
router.post('/cod',authMiddleware.verifyUser,PaymentController.paymentCod)
router.get('/check',PaymentController.checkPayment)
export default router