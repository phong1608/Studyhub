import categoryController from "../../controllers/category.controller";


import { Router } from "express";

const router = Router()
router.get('/get',categoryController.getAllCategory)

export default router
