import { Question } from "../models/question.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createQuestion = asyncHandler(async(req,res) => {
    const {title, body} = req.body
    if(!title || !body){
        throw new ApiError(400, "All fields are required.")
    }

    const question = await Question.create({
        title,
        body,
        author: req.user._id
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, question, "Question created successfully.")
    )
});

const getAllQuestions = asyncHandler(async(req,res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit;

    const questions = await Question.find()
        .sort({ createdAt: -1 })          // newest first
        .skip(skip)
        .limit(limit)
        .populate("author", "username fullName") // optional but useful
        .select("-__v");

    const totalQuestions = await Question.countDocuments();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                questions,
                pagination: {
                    total: totalQuestions,
                    page,
                    limit,
                    totalPages: Math.ceil(totalQuestions / limit),
                },
            },
            "Questions fetched successfully."
        )
    )
    
});

const getSingleQuestion = asyncHandler(async(req,res) => {
    const {questionId} = req.params
    if(!questionId){
        throw new ApiError(400, "question Id not found or incorrect")
    }

    const question = await Question.findById(questionId)
    if(!question){
        throw new ApiError(400, "Question not found.")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,
            question,
            "Question fetched successfully."    
        )
    )
});

const deleteQuestion = asyncHandler(async(req,res) => {
    const {questionId} = req.params
    if(!questionId){
        throw new ApiError(400, "Question Id is missing.")
    }

    const question = await Question.findById(questionId)
    if(!question){
        throw new ApiError(400, "Question is missing.")
    }

    console.log(question)

    if(question.author.toString() != req.user._id.toString()){
        throw new ApiError(403, "User is not authorised to delete this question.")
    }

    await question.deleteOne()

    return res
    .status(200)
    .json(new ApiResponse(200, "Question deleted successfully."))
});



export {
    createQuestion,
    getAllQuestions,
    getSingleQuestion,
    deleteQuestion,
}