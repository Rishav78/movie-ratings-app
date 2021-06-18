import mongoose from 'mongoose';
const { Schema } = mongoose;

const ratingSchema = new Schema({
  stars: {
    type: Number,
    require: true,
    min: 1,
    max: 10,
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
  },
  isDeleted: {
    type: Boolean,
    require: true,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('rating', ratingSchema);