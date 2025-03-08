import { Router } from "express";
import commentController from "../../controllers/comment.controller";
import authMiddleware from "../../middlewares/auth.middlware";

const router = Router();
router.post('/create/',authMiddleware.verifyUser,commentController.addComment)
router.get('/lesson=:lessonId/comment',commentController.getAllCommentsByLesson)
router.get('/comment/:commentId',commentController.getRootComments)
export default router
