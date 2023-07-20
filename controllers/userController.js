const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
    // Get all users 
    async getUser(req, res) {
        try {
          const users = await User.find().populate("thoughts").populate("friends");
          const userObj = {
            users
          };
          return res.json(userObj);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    // Get user by _id
    // check 'userId
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId }).populate("thoughts").populate("friends")
            .select('-__v')
            ;
    
          if (!user) {
            return res.status(404).json({ message: 'No user found' });
          }
    
          res.json({
            user,

          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    // Post new user
    // this probably needs some work
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          const thoughts = await Thought.find(
            {_id: req.body.username},
            {$addToSet: { user: user._id}}
          )
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // Put update user by id
    // probably needs work
    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user found' });
          }
    
          res.json(user);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    // Delete user by ID
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndRemove({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user found' });
          }
    
          res.json({ message: 'User successfully deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async addFriend ({params, body}, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: body} },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: "No user found" });
              }
              res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
        },
    
      async deleteFriend ({params, body}, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: { friendId: params.friendId}} },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: "No friend found" });
              }
              res.json(reaction);
        } catch (err) {
          res.status(500).json(err);
        }
        },


}