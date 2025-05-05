import {addDiscount,getAllDiscountByUserId} from '../services/discount.service'
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";


class DiscountController {
    addDiscount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const discount = req.body;
            const newDiscount = await addDiscount(discount);
            res.status(StatusCodes.CREATED).json(newDiscount);
        } catch (err) {
            next(err);
        }
    }
    getAllDiscountByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.currentUser.id;
            const discounts = await getAllDiscountByUserId(userId);
            res.status(StatusCodes.OK).json(discounts);
        } catch (err) {
            next(err);
        }
    }
}
export default new DiscountController();