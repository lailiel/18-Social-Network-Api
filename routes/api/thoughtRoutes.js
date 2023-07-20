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

// /api/courses
router.route("/").get(getThought).post(createThought);

// /api/courses/:courseId
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
