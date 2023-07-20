const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
      const thoughtObj = {
        thoughts,
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get thought by ID
  // check 'thoughtId'
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions')
        .select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Post new Thought

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);

      const pushThought = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: {thoughts: thought._id} },
        { runValidators: true, new: true }
      );
      res.json(pushThought)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Put update thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete though by ID
  // check 'thoughtId'
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction (req, res) {
    try {
        const reaction = await Reaction.create(req.body);
            res.json(reaction);

        const pushReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: {reactions: reaction} },
            { new: true }
        );
        if (!pushReaction) {
            res.status(404).json({ message: "No reaction found" });
          }
          res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
    },

  async deleteReaction (req, res) {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: { reactionId: params.reactionId}} },
            { new: true }
        );
        if (!reaction) {
            res.status(404).json({ message: "No reaction found" });
          }
          res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
    },
};
