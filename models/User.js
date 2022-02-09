const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    role: String,
    tokens: [],
    followers: [],
    verified: {
      type: Boolean,
      default: false,
    },
    postId: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    followersId: [{ type: String, ref: "User" }],
  },
  { timestamps: true }
);
UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
