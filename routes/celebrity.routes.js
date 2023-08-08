const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")

// GET "/Celebrity/create" => Show a form to create a celebrity
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs")
});

// POST "/Celebrity/create" => Send the data from the form to this route to create the celebrity and save it to the database
router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(req.body)

  if (name === "" || occupation === "" || catchPhrase === "") {
    res.render("celebrities/new-celebrity.hbs")
  }

  try {
    await Celebrity.create( { name, occupation, catchPhrase } )
    res.redirect("/celebrity")
  } catch (error) {
    next(error)
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allCelebrity = await Celebrity.find()
    console.log(allCelebrity)
    res.render("celebrities/celebrities.hbs", {
      allCelebrity
      
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router