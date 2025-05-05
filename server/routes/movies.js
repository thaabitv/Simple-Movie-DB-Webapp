const express = require("express");
const axios = require("axios");
const Movie = require("../models/movie");

const router = express.Router();

// Seed the DB with 100 movies from TMDB
router.get("/seed", async (req, res) => {
  try {
    let allMovies = [];

    // Fetch first 5 pages (20 movies each)
    for (let page = 1; page <= 5; page++) {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US",
          page,
        },
      });

      allMovies.push(...response.data.results);
    }

    // Optional: clean up the movie objects to match your schema
    const cleanedMovies = allMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
    }));

    await Movie.deleteMany({});
    await Movie.insertMany(cleanedMovies);

    res.status(200).json({ message: `Seeded ${cleanedMovies.length} movies!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from TMDB" });
  }
});

// GET /api/movies?search=batman&page=2
router.get("/", async (req, res) => {
  const { search = "", page = 1, limit = 9 } = req.query;

  const query = {};
  if (search.trim()) {
    query.title = { $regex: search, $options: "i" };
  }

  try {
    const total = await Movie.countDocuments(query);
    const movies = await Movie.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total, movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load movies" });
  }
});

module.exports = router;
