import mongoose from 'mongoose';
const { Schema } = mongoose;

const movieSchema = new Schema({
  _id: {
    type: String,
    require: true,
  },
  title:  {
    type: String,
    require: true,
  },
  releaseDate: {
    type: Date,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'rating',
    default: []
  }],
  isDeleted: {
    type: Boolean,
    require: true,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('movie', movieSchema);