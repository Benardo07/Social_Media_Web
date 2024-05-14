import express from "express";
import { getUser , updateUser , getSuggestions, getFriends} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get('/suggestions/:userId', getSuggestions);
router.get('/friends/:userId', getFriends);
export default router