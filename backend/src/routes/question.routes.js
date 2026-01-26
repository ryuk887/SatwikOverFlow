import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createQuestion,
    getAllQuestions,
    getSingleQuestion,
    deleteQuestion
} from "../controllers/question.controllers.js";

const router = Router();

// public
router.get("/", getAllQuestions);
router.get("/:questionId", getSingleQuestion);

// protected
router.post("/", verifyJWT, createQuestion);
router.delete("/:questionId", verifyJWT, deleteQuestion);

export default router;
