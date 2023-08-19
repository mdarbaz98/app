import express from "express";
import { verifyToken } from '../middleware/auth.js';

import {
    addPost,
    getPost,
    getALLPosts,
    deletePost,
    likePost
} from '../Controllers/post.js';


const router = express.Router();

// CREATE 
router.post("/", addPost);

// READ 
router.get("/", verifyToken, getALLPosts);
router.get("/:user_Id/posts", getPost);

// UPDATE 
router.patch("/:post_id/like", likePost)

// DELETE 
router.delete("/:id", verifyToken, deletePost);



export default router;