import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createVote } from "../controllers/vote.controllers.js";

const router = Router();

// voting
router.post(
    "/questions/:questionId/vote",
    verifyJWT,
    createVote
);

router.post(
    "/answers/:answerId/vote",
    verifyJWT,
    createVote
);

export default router;
