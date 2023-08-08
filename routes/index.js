const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebrityRouter = require("./celebrity.routes.js")
router.use("/celebrity" , celebrityRouter)

const moviesRouter = require("./movies.routes.js")
router.use("/movies", moviesRouter)

module.exports = router
