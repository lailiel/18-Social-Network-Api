const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/user
router
.route('/')
.get(getUser)
.post(createUser);

// /api/user/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;