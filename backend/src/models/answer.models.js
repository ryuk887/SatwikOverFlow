import mongoose, {Schema} from "mongoose"

const answerSchema = new Schema({
    question_id: {
        type: mongoose.Types.ObjectId,
        ref: "Question"
    },
    body: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

export const Answer = mongoose.model("Answer", answerSchema)