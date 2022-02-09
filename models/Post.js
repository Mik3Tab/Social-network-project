const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    likes: [],

    comments: [
      {
        userId: { type: ObjectId, ref: "User" },
        userName: { type: String, ref: "User" },
        comment: String,
      },
    ],
    userId: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
