import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createQuestion, getAllQuestions, getSingleQuestion, deleteQuestion } from "../controllers/question.controllers.js";

const router = Router()

router.route("/CreateQuestion").post(verifyJWT, createQuestion)
router.route("/AllQuestions").get(getAllQuestions)
router.route("/Question/:questionId").get(getSingleQuestion)
router.route("/DeleteQuestion/:questionId").delete(verifyJWT, deleteQuestion)

export default router