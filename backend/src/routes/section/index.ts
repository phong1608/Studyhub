import { Router } from "express";
import authMiddware from "../../middlewares/auth.middlware";
import sectionController from "../../controllers/section.controller";
const router = Router();

router.post("/create", authMiddware.verifyUser, sectionController.addSection);
router.get("/:courseId", sectionController.getAllCourseSections);
export default router
