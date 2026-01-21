import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import announcementsRouter from './routes/announcements';
import donationsRouter from './routes/donations';
import programsRouter from './routes/programs';
import studentsRouter from './routes/students';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// API Routes
app.use('/api/announcements', announcementsRouter);
app.use('/api/donations', donationsRouter);
app.use('/api/programs', programsRouter);
app.use('/api/students', studentsRouter);

// Start server
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
