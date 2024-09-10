import express from "express";
import {servefile} from "../controllers/serve.js";
import { verifyToken } from "../utils/verifyUser.js";
const router=express.Router();


router.get("/:id",verifyToken,servefile);
export default router;
