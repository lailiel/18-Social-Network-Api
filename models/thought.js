const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: new ObjectId,
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
    get: (timestamp) => dayjs().get('DD / MM / yyyy'),
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
    type: Date,
    default: Date.now,
    get: (timestamp) => dayjs().get('DD / MM / yyyy'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
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

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
