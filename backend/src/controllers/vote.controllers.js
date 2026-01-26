import { Question } from "../models/question.models";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { Answer } from "../models/answer.models";
import { Vote } from "../models/vote.models";

const createVote = asyncHandler(async (req, res) => {
    const { QuestionId } = req.params
    const { value } = req.body
    const userId = req.user.user_id

    // 1️⃣ Validate vote value
    if (![1, -1].includes(value)) {
        throw new ApiError(400, "Vote value can only be 1 or -1")
    }

    // 2️⃣ Check question existence
    const questionExists = await Question.exists({ _id: QuestionId })
    if (!questionExists) {
        throw new ApiError(404, "Question does not exist")
    }

    // 3️⃣ Check existing vote
    const existingVote = await Vote.findOne({
        user_id: userId,
        target_id: QuestionId,
        target_type: "Question"
    })

    let result

    // 4️⃣ No previous vote → create
    if (!existingVote) {
        result = await Vote.create({
            user_id: userId,
            target_id: QuestionId,
            target_type: "Question",
            value
        })
    }
    // 5️⃣ Same vote again → remove (toggle)
    else if (existingVote.value === value) {
        await existingVote.deleteOne()
        result = null
    }
    // 6️⃣ Different vote → update
    else {
        existingVote.value = value
        await existingVote.save()
        result = existingVote
    }

    return res.status(200).json(
        new ApiResponse(200, result, "Vote processed successfully")
    )
})

export {
    createVote
}