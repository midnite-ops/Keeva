import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
	{
		postImage: {
			type: String,
			required: true,
		},
		postDescription: {
			type: String,
			required: true,
		},
		brandItems: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
		],
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
		savedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
	},
	{ timestamps: true },
);

export const post = mongoose.model("posts", postSchema);
