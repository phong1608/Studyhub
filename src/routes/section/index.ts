import { Router } from "express";
import { verifyUser } from "../../middlewares/auth.middlware";
import sectionController from "../../controllers/section.controller";
const router = Router();

router.post("/create", verifyUser, sectionController.addSection);

export default router
