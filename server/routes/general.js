import express from "express";
import { getUser } from "../controllers/general.js";

const router = express.Router();

// getUser is a function from controllers
// :id is the param we pass
router.get("/user/:id", getUser);

export default router;
