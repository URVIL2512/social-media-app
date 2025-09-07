const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Post = require("../models/Post")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const bcrypt = require("bcryptjs")
const path = require("path")
const { JWT_SECRET } = require("../config")

function verifyToken(req, res, next) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: "No token" })
  const token = auth.split(" ")[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.userId = payload.id
    next()
  } catch {
    return res.status(401).json({ error: "Invalid token" })
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const upload = multer({ storage })

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").lean()
  if (!user) return res.status(404).json({ error: "Not found" })
  const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 })
  res.json({ user, posts })
})

router.put("/:id/bio", verifyToken, async (req, res) => {
  if (req.userId !== req.params.id) return res.status(403).json({ error: "Forbidden" })
  const user = await User.findById(req.params.id)
  user.bio = req.body.bio
  await user.save()
  res.json({ bio: user.bio })
})

router.put("/:id/password", verifyToken, async (req, res) => {
  if (req.userId !== req.params.id) return res.status(403).json({ error: "Forbidden" })
  const { oldPassword, newPassword } = req.body
  const user = await User.findById(req.params.id)
  const match = await bcrypt.compare(oldPassword, user.password)
  if (!match) return res.status(400).json({ error: "Old password wrong" })
  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()
  res.json({ success: true })
})

router.put("/:id/avatar", verifyToken, upload.single("avatar"), async (req, res) => {
  if (req.userId !== req.params.id) return res.status(403).json({ error: "Forbidden" })
  if (!req.file) return res.status(400).json({ error: "No file uploaded" })
  const user = await User.findById(req.params.id)
  user.avatarUrl = `/uploads/${req.file.filename}`
  await user.save()
  res.json({ avatarUrl: user.avatarUrl })
})

module.exports = router
