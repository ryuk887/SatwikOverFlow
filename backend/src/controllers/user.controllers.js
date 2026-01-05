import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {User} from "../models/user.models.js";
import jwt from "jsonwebtoken";


const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend
    // check if the values are empty
    // check if the user is already registered
    // create user object in the db
    // remove password and refresh token from the response
    // check for user creation 
    // return response

    console.log(req.body)

    const {username, email, fullName, password} = req.body
    if([username, email, fullName, password].some((field) => field?.trim() == "")){
            throw new ApiError(400, "all field are required.")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with username or email already exists.")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating the user object")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, createdUser, "User registered succesfully.")
    )

})


export {
    registerUser
}