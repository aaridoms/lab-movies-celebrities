const router = require("express").Router();
const Celebrities = require("../models/Celebrity.model.js")

// GET "/celebrities/create" => Show a form to create a celebrity
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs")
});

// POST "/celebrities/create" => Send the data from the form to this route to create the celebrity and save it to the database
router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(req.body)

  if (name === "" || occupation === "" || catchPhrase === "") {
    res.render("celebrities/new-celebrity.hbs")
  }

  try {
    await Celebrities.create( { name, occupation, catchPhrase } )
    res.redirect("/")
  } catch (error) {
    next(error)
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrities.find()
    res.render("celebrities/celebrities.hbs", {
      allCelebrities
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router