import logger from "@/config/logger";
import { creator } from "@/models/fashion.model";
import { product } from "@/models/product.model";
import { post } from "@/models/post.model";
import { NOT_FOUND, OK } from "@/utils/status";
import mongoose from "mongoose";

export const fetchPosts = async (req: GlobalRequest, res: GlobalResponse, next: GlobalNextFunction) => { 
    try {
        // use filter (for you, trending, folowwing, new and brands) and pagination (limit and skip) to fetch posts
        const posts = await post.find();

        res.status(OK).json({ posts });
    } catch (error) { 
        next(error);
    }
}

export const likePost = async (req: GlobalRequest, res: GlobalResponse, next: GlobalNextFunction) => {
    try {
        const { postId } = req.params;

        const id = req.id!;

        const postToLike = await post.findById(postId);

        if (!postToLike) {
            res.status(NOT_FOUND).json({ message: "Post not found" });
            return;
        }

        // Check if user has already liked the post
        const isLiked = postToLike.likes.includes(id);

        if (isLiked) {
            // Unlike the post
            postToLike.likes = postToLike.likes.filter((likeId: mongoose.Types.ObjectId) => likeId !== new mongoose.Types.ObjectId(id));
        } else {
            // Like the post
            postToLike.likes.push(new mongoose.Types.ObjectId(id));
        }

        await postToLike.save();

        res.status(OK).json({ message: "Post liked/unliked successfully" });
    } catch (error) { 
        next(error);
    }
}

export const addOutfitToCart = async (req: GlobalRequest, res: GlobalResponse, next: GlobalNextFunction) => { 

}

export const savePost = async (req: GlobalRequest, res: GlobalResponse, next: GlobalNextFunction) => { 
    try {
        const postId = req.params.postId;

        const id = req.id!;

        const postToSave = await post.findById(postId);

        if (!postToSave) {
            res.status(NOT_FOUND).json({ message: "Post not found" });
            return;
        }

        // Check if user has already saved the post
        const isSaved = postToSave.savedBy.includes(id);

        if (isSaved) {
            // Unsave the post
            postToSave.savedBy = postToSave.savedBy.filter((userId: mongoose.Types.ObjectId) => userId !== new mongoose.Types.ObjectId(id));
        } else {
            // Save the post
            postToSave.savedBy.push(new mongoose.Types.ObjectId(id));
        }

        await postToSave.save();

        res.status(OK).json({ message: "Post saved/unsaved successfully" });
    } catch (error) { 
        logger.error(error);
        next(error);
    }
}

export const fashionProfile = async (req: GlobalRequest, res: GlobalResponse, next: GlobalNextFunction) => {
    try {
        const userId = req.params.userId;

        const fashionUser = await creator.findById(userId).lean();

        if (!fashionUser) { 
            res.status(NOT_FOUND).json({ error: "creator does not exists" });
            return;
        }

        // const posts = await 

        res.status(OK).json({ message: "creator fetched", creator: fashionUser });
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

export const fetchProducts = async (req: GlobalRequest, res: GlobalResponse, next: GlobalNextFunction) => { 
    try {
        const { isCreator, userId } = req.query as unknown as { isCreator: boolean; userId: string };

        if (isCreator) { 

        }

        const products = await product.findMany();

        // cache to redis

        res.status(OK).json({ message: "products fetched successfully", products });
    } catch (error) {
        logger.error(error);
        next(error);
    }
}
