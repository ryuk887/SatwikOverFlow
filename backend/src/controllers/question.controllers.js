import { Question } from "../models/question.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";


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

const getAllQuestions = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const questions = await Question.aggregate([
        // 1️⃣ sort first (newest)
        {
            $sort: { createdAt: -1 }
        },

        // 2️⃣ pagination
        {
            $skip: skip
        },
        {
            $limit: limit
        },

        // 3️⃣ join votes
        {
            $lookup: {
                from: "votes",
                localField: "_id",
                foreignField: "question_id",
                as: "votes"
            }
        },

        // 4️⃣ calculate vote count
        {
            $addFields: {
                voteCount: {
                    $sum: "$votes.value"
                }
            }
        },

        // 5️⃣ join answers
        {
            $lookup: {
                from: "answers",
                localField: "_id",
                foreignField: "question_id",
                as: "answers"
            }
        },

        // 6️⃣ calculate answer count
        {
            $addFields: {
                answerCount: {
                    $size: "$answers"
                }
            }
        },

        // 7️⃣ join author
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author"
            }
        },

        // 8️⃣ author comes as array → flatten it
        {
            $unwind: "$author"
        },

        // 9️⃣ shape final output
        {
            $project: {
                title: 1,
                body: 1,
                createdAt: 1,
                voteCount: 1,
                answerCount: 1,
                "author.username": 1,
                "author.fullName": 1
            }
        }
    ]);

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
                    totalPages: Math.ceil(totalQuestions / limit)
                }
            },
            "Questions fetched successfully."
        )
    );
});


const getSingleQuestion = asyncHandler(async (req, res) => {
    const { questionId } = req.params;

    if (!questionId) {
        throw new ApiError(400, "Question ID is required.");
    }

    const question = await Question.aggregate([
        // 1️⃣ match question
        {
            $match: {
                _id: new mongoose.Types.ObjectId(questionId)
            }
        },

        // 2️⃣ join question votes
        {
            $lookup: {
                from: "votes",
                localField: "_id",
                foreignField: "question_id",
                as: "votes"
            }
        },

        // 3️⃣ compute question vote count
        {
            $addFields: {
                voteCount: {
                    $sum: "$votes.value"
                }
            }
        },

        // 4️⃣ join author
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author"
            }
        },
        {
            $unwind: "$author"
        },

        // 5️⃣ join answers
        {
            $lookup: {
                from: "answers",
                localField: "_id",
                foreignField: "question_id",
                as: "answers"
            }
        },

        // 6️⃣ enrich each answer
        {
            $lookup: {
                from: "votes",
                let: { answerIds: "$answers._id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$target_type", "Answer"] },
                                    { $in: ["$target_id", "$$answerIds"] }
                                ]
                            }
                        }
                    }
                ],
                as: "answerVotes"
            }
        },

        // 7️⃣ map answers with vote count
        {
            $addFields: {
                answers: {
                    $map: {
                        input: "$answers",
                        as: "answer",
                        in: {
                            _id: "$$answer._id",
                            body: "$$answer.body",
                            createdAt: "$$answer.createdAt",
                            voteCount: {
                                $sum: {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$answerVotes",
                                                as: "vote",
                                                cond: {
                                                    $eq: ["$$vote.target_id", "$$answer._id"]
                                                }
                                            }
                                        },
                                        as: "v",
                                        in: "$$v.value"
                                    }
                                }
                            },
                            user_id: "$$answer.user_id"
                        }
                    }
                }
            }
        },

        // 8️⃣ populate answer users
        {
            $lookup: {
                from: "users",
                localField: "answers.user_id",
                foreignField: "_id",
                as: "answerUsers"
            }
        },

        // 9️⃣ attach user info to answers
        {
            $addFields: {
                answers: {
                    $map: {
                        input: "$answers",
                        as: "answer",
                        in: {
                            _id: "$$answer._id",
                            body: "$$answer.body",
                            createdAt: "$$answer.createdAt",
                            voteCount: "$$answer.voteCount",
                            user: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$answerUsers",
                                            as: "u",
                                            cond: {
                                                $eq: ["$$u._id", "$$answer.user_id"]
                                            }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    }
                }
            }
        },

        // 🔟 final shape
        {
            $project: {
                title: 1,
                body: 1,
                createdAt: 1,
                voteCount: 1,
                "author.username": 1,
                "author.fullName": 1,
                answers: 1
            }
        }
    ]);

    if (!question.length) {
        throw new ApiError(404, "Question not found.");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            question[0],
            "Question fetched successfully."
        )
    );
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