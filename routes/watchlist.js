import express from "express";
import {
  addMovie,
  deleteMovie,
  getWatchlist,
  updateMovie,
} from "../utils/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();
router.use(authenticate);

router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const watchlist = getWatchlist(userId);
  if (!watchlist) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json({ watchlist });
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieData = req.body?.movie ?? req.body;
  const movie = addMovie(userId, movieData);
  if (!movie) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(201).json({ movie });
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const updates = req.body?.updates ?? req.body?.movie ?? req.body;
  const movie = updateMovie(userId, movieId, updates);
  if (!movie) {
    return res.status(404).json({ error: "Movie or user not found" });
  }
  return res.status(200).json({ movie });
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const deleted = deleteMovie(userId, movieId);
  if (!deleted) {
    return res.status(404).json({ error: "Movie or user not found" });
  }
  return res.status(200).json({ message: "Movie removed from watchlist." });
});

export default router;
