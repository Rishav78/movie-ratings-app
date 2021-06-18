import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName:  {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    require: true,
    default: false,
  }
}, {
  timestamps: true,
});

export default mongoose.model('user', userSchema);