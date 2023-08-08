const router = require("express").Router();

const Movie = require("../models/Movies.model.js");
const Celebrity = require("../models/Celebrity.model.js");

// /* GET home page */ Show a form to create a movie and add celebrity info to the view
router.get("/create", async (req, res, next) => {
  try {
    const allCelebrity = await Celebrity.find();

    console.log(allCelebrity);
    res.render("movies/new-movie.hbs", {
      allCelebrity,
    });
  } catch (error) {}
});

// POST // Send the data from the form to this route to create the movie and save it to the database

router.post("/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    console.log(cast);
    const newMovie = await Movie.create({ title, genre, plot, cast });
    console.log(newMovie);

    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET /movies show all movies
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies.hbs", { allMovies });
  } catch (error) {
    next(error);
  }
});

// GET /movies/:id show the details of all movies
router.get("/:movieId", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.movieId).populate("cast");
    console.log(oneMovie);
    res.render("movies/movie-details.hbs", {
      oneMovie,
    });
  } catch (error) {
    next(error);
  }
});

// POST "/movies/:id/delete	" => Delete a specific movie
router.post("/:movieId/delete", async (req, res, next) => {
  const { movieId } = req.params

  try {
    await Movie.findByIdAndDelete(movieId)
    res.redirect("/movies")
  } catch (error) {
    next(error)
  }
});

// GET "/:movieId/edit" => Show a form to edit a movie
router.get("/:movieId/edit", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.movieId)
    const oneCelebrity = await Celebrity.find()

    res.render("movies/edit-movie", {
      oneMovie,
      oneCelebrity
    })

  } catch (error) {
    next(error)
  }
});

// POST "/movies/:movieId/edit" => Send the data from the form to this route to update the specific movie
router.post("/:movieId/edit", async (req, res, next) => {

  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.findByIdAndUpdate(req.params.movieId, { title, genre, plot, cast })
    res.redirect("/movies")
  } catch (error) {
    next(error)
  }
});

module.exports = router;
