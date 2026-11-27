import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "merchant",
        required: true
    },
    affiliates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "creator"
    }]
}, { timestamps: true });

export const product = mongoose.model("product", productSchema);