import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

export const waitlist = mongoose.model("Waitlist", waitlistSchema);