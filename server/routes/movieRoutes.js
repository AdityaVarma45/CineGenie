import express from "express";
import { getMovies } from "../controllers/movieController.js";

const router = express.Router();

router.post("/suggest", getMovies);

export default router;