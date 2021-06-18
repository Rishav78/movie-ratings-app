import mongoose from 'mongoose';
const { Schema } = mongoose;

const ratingSchema = new Schema({
  stars: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: false,
  },
  movie: {
    type: String,
    ref: 'movie',
    required: true
  },
  user: {
    type: String,
    ref: 'user',
    required: true
  }
}, {
  timestamps: true,
});

export default mongoose.model('rating', ratingSchema);