import mongoose from 'mongoose';
import { uuid } from '../../lib/constants';
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: String,
    require: true,
    match: [uuid, 'please provide a uuid']
  },
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
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please provide a valid email"
    ]
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