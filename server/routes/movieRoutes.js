import express from "express";
import { getMovies, getNextMovies } from "../controllers/movieController.js";

const router = express.Router();

router.post("/suggest", getMovies);
router.get("/next", getNextMovies);

export default router;