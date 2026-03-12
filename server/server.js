import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

/* Debug environment variables */
console.log("PORT:", process.env.PORT);
console.log("TMDB KEY:", process.env.TMDB_API_KEY ? "Loaded" : "Missing");
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY ? "Loaded" : "Missing");

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("CineGenie API running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});