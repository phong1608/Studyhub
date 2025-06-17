import { Router } from "express";
import discountController from "../../controllers/discount.controller";
import authMiddleware from "../../middlewares/auth.middlware";

const router = Router();
router.post('/create',authMiddleware.verifyUser, discountController.addDiscount);
router.get('/all',authMiddleware.verifyUser, discountController.getAllDiscountByUserId);

export default router;