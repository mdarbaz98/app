import express from 'express';
import {
    getUser,
    getUserFriends,
    addFriend,
    removeFriend,
} from '../Controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Read 
router.get("/:id",verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// CREATE and DELETE 
 router.post("/:id/:friendId", verifyToken, addFriend)
 router.delete("/:id/:friendId", verifyToken, removeFriend)

 export default router;