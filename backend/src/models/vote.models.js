import mongoose, {Schema} from "mongoose"

const voteSchema = new Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    target_id:{
        type: mongoose.Types.ObjectId,
        index: true,
        required: true
    },
    target_type:{
        type: String,
        required: true,
        enum: ["Question", "Answer"]
    },
    value:{
        type: Number,
        required: true,
        enum: [1,-1]
    }
},{
    timestamps: true
})

voteSchema.index(
    {user_id:1, target_id:1, target_type:1},
    {unique: true}
)

export const Vote = mongoose.model("Vote", voteSchema)