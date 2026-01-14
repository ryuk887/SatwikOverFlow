import { Router } from "express";
import {registerUser, loginUser, logOutUser, updatePassword} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.midlleware.js";

const router = Router()

router.route("/register").post(
    upload.none(),
    registerUser
)

router.route("/login").post(
    upload.none(),
    loginUser
)

//secured route
router.route("/logout").post(verifyJWT, logOutUser)
// router.route("/refresh-token").post(refreshAccessToken)

export default router