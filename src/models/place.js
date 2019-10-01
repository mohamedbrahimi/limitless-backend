import mongoose from 'mongoose';

const { Schema } = mongoose;


const Place = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [],
    },
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
);

export default mongoose.model('place', Place);
