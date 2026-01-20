import { Router } from "express";
import {registerUser, loginUser, logOutUser, updatePassword, getCurrentUser, getMyQuestions} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured route
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/PasswordUpdate").post(verifyJWT, updatePassword)
router.route("/CurrentProfile").post(verifyJWT, getCurrentUser)
router.route("/MyQuestions").post(verifyJWT, getMyQuestions)


export default router