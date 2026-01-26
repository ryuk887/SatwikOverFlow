import { Router } from "express";
import {
    registerUser,
    loginUser,
    logOutUser,
    updatePassword,
    getCurrentUser,
    getMyQuestions
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// public
router.post("/register", registerUser);
router.post("/login", loginUser);

// protected
router.post("/logout", verifyJWT, logOutUser);
router.patch("/password", verifyJWT, updatePassword);
router.get("/me", verifyJWT, getCurrentUser);
router.get("/me/questions", verifyJWT, getMyQuestions);

export default router;
