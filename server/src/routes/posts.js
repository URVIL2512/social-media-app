const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/', verifyToken, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    const post = await Post.create({ author: req.userId, text, imageUrl: imageUrl || '' });
    const populated = await post.populate('author', 'username avatarUrl');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'username avatarUrl')
      .populate('comments.author', 'username avatarUrl');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.author.toString() !== req.userId) return res.status(403).json({ error: 'Forbidden' });
    post.text = req.body.text || post.text;
    post.imageUrl = req.body.imageUrl !== undefined ? req.body.imageUrl : post.imageUrl;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.author.toString() !== req.userId) return res.status(403).json({ error: 'Forbidden' });
    await post.remove();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    const idx = post.likes.findIndex(x => x.toString() === req.userId);
    if (idx >= 0) {
      post.likes.splice(idx, 1);
    } else {
      post.likes.push(req.userId);
    }
    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/comment', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    post.comments.push({ author: req.userId, text: req.body.text });
    await post.save();
    const populated = await Post.findById(post._id).populate('comments.author', 'username avatarUrl');
    res.json(populated.comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
