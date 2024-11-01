import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  id: { type: String, required: true },
  book: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true }
}, {
  timestamps: true
});

export const Highlight = mongoose.model('Highlight', highlightSchema); 