const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController.js');


router
.route('/')
.get(getUser)
.post(createUser);


router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


router
.route('/:userId/friend/:friendId')
  .post(addFriend)
  .delete(deleteFriend)

module.exports = router;