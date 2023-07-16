const { Schema, model } = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    // finish this - value set to a new ObjectId
    default: "",
  },
  reactionBody: {
    type: String,
    required: true,
    max_length: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    // finish this
    Date: "",
    // finish this value of current timestamp
    default: "",
    // finish this format the timestamp on query
    getter: "",
  },
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    min_length: 1,
    max_length: 280,
  },
  createdAt: {
    // finish this
    Date: "",
    // finish this value of current timestamp
    default: "",
    // finish this format the timestamp on query
    getter: "",
  },
  username: {
    // of the user that created this thought
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
