import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
    bio: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: "users"
    }]
}, { timestamps: true });

export const creator = mongoose.model("creators", fashionistSchema);

