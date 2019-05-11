const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const Comment = new Schema({
  commentId: Schema.ObjectId,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

Comment.statics.create = function({ content }) {
  const comment = new this({ content });
  return comment.save();
};

autoIncrement.initialize(mongoose.connection);
Comment.plugin(autoIncrement.plugin, 'Comment');

module.exports = mongoose.model('Comment', Comment);
