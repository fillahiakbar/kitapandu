import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRouter from "./routes/auth"
import announcementsRouter from "./routes/announcements"
import donationsRouter from "./routes/donations"
import programsRouter from "./routes/programs"
import studentsRouter from "./routes/students"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "Backend is running" })
})

// API Routes
app.use("/api/auth", authRouter)
app.use("/api/announcements", announcementsRouter)
app.use("/api/donations", donationsRouter)
app.use("/api/programs", programsRouter)
app.use("/api/students", studentsRouter)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
