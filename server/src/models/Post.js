const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text:   String,
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text:     { type: String, required: true },
  imageUrl: { type: String, default: '' },
  likes:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
