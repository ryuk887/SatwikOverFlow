import { Answer } from "../models/answer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Question } from "../models/question.models.js";

const createAnswer = asyncHandler(async(req,res) => {
    const {questionId} = req.params
    const {body} = req.body

    if(!questionId){
        throw new ApiError(404, "QuetionId is missing")
    }
    if(!body){
        throw new ApiError(404, "Answer body is missing")
    }

    const questionexists = await Question.exists({_id: questionId})
    if(!questionexists){
        throw new ApiError(404, "This question does not exists in database.")
    }

    const answer = await Answer.create({
        question_id: questionId,
        body: body,
        user_id: req.user._id
    })

    return res
    .status(200)
    .json(new ApiResponse(200, answer, "Answer created successfully."))
})

const getAnswersByQuestion = asyncHandler(async(req,res) => {
    const {questionId} = req.params
    if(!questionId){
        throw new ApiError(404, "QuetionId is missing")
    }

    const questionexists = await Question.exists({_id: questionId})
    if(!questionexists){
        throw new ApiError(404, "This question does not exists in database.")
    }

    const answers = await Answer.find({
        question_id: questionId
    })
    .sort({createdAt: -1})
    .select("body createdAt")

    return res
    .status(200)
    .json(new ApiResponse(200, answers, "All answers of this question fetched."))
})

const deleteAnswer = asyncHandler(async(req,res) => {
    const {answerId} = req.params
    if(!answerId){
        throw new ApiError(400, "Answer Id is missing.")
    }

    const answer = await Question.findById(answerId)
    if(!answer){
        throw new ApiError(400, "Answer is missing.")
    }

    console.log(answer)

    if(answer.author.toString() != req.user._id.toString()){
        throw new ApiError(403, "User is not authorised to delete this answer.")
    }

    await answer.deleteOne()

    return res
    .status(200)
    .json(new ApiResponse(200, "Answer deleted successfully."))
})

export {
    createAnswer,
    getAnswersByQuestion,
    deleteAnswer
}