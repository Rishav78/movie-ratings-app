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
    type: Schema.Types.ObjectId,
    ref: 'movie',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps: true,
});

export default mongoose.model('rating', ratingSchema);