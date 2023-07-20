const { Schema, model, Types } = require("mongoose");
const formatDate = require('../utils/formatDate')

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },],
  },
  {
    toJson: {
      getters: true,
      virtuals: true,
    },
    id: true,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
const Reaction = model("Reaction", reactionSchema);

module.exports = Thought, Reaction;
