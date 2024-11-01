import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Highlight } from './models/Highlight';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

mongoose.connect("mongodb+srv://osdev:MYziS2Br8l6wxdLn@cluster0.qmw1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.post('/api/highlights', async (req, res) => {
  try {
    const highlights = req.body;
    await Highlight.deleteMany({}); // Clear existing highlights
    const savedHighlights = await Highlight.insertMany(highlights);
    res.json(savedHighlights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save highlights' });
  }
});

app.get('/api/highlights', async (req, res) => {
  try {
    const highlights = await Highlight.find();
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch highlights' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 