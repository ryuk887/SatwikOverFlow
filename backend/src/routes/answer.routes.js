import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createAnswer,
    getAnswersByQuestion,
    deleteAnswer
} from "../controllers/answer.controllers.js";

const router = Router();

// answers belong to questions
router.post(
    "/questions/:questionId/answers",
    verifyJWT,
    createAnswer
);

router.get(
    "/questions/:questionId/answers",
    getAnswersByQuestion
);

// delete by answer id
router.delete(
    "/:answerId",
    verifyJWT,
    deleteAnswer
);

export default router;
