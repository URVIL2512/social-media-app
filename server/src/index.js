const express = require("express")
const http = require("http")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const { MONGO_URI, PORT } = require("./config")
const authRoutes = require("./routes/auth")
const postsRoutes = require("./routes/posts")
const imageRoutes = require("./routes/imageGen")
const usersRoutes = require("./routes/users")
const setupSockets = require("./sockets")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use("/api/auth", authRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/image", imageRoutes)
app.use("/api/users", usersRoutes)

const server = http.createServer(app)
setupSockets(server)

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => console.log("Server listening on", PORT))
  })
  .catch((err) => {
    console.error("DB connection error", err)
    process.exit(1)
  })
