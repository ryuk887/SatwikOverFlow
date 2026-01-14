import mongoose, {Schema} from "mongoose"

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

export const Question = mongoose.model("Question", questionSchema)