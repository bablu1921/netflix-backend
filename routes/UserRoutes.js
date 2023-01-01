const router = require("express").Router();

const {
  addToLikedMovies,
  getUserLikedMovies,
  removeFromLikedMovies,
} = require("../controllers/UserController");

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getUserLikedMovies);
router.put("/delete/", removeFromLikedMovies);

module.exports = router;
