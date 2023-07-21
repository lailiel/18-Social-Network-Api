const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");


router.route("/").get(getThought).post(createThought);


router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)
  .put(addReaction)

router
.route('/:thoughtId/reaction')
.post(addReaction)


router
  .route("/:thoughtId/reaction/:reactionId")
  .delete(deleteReaction);

module.exports = router;
