import mongoose from "mongoose";

const sharesSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        userRef: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
)

const shares = mongoose.model('Shares', sharesSchema);

export default Listing;