import mongoose, {Schema} from "mongoose"

const voteSchema = new Schema({
    question_id:{
        type: mongoose.Types.ObjectId,
        ref: "Question"
    },
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    value:{
        type: Number,
        required: true
    }
},{
    timestamps: true
})

export const Vote = mongoose.model("Vote", voteSchema)