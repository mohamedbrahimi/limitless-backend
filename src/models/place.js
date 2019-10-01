import mongoose from 'mongoose';

const { Schema } = mongoose;


const Place = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: ''
    },
    location: {
      lat: {
        type: Number,
        default: 0,
      },
      lng: {
        type: Number,
        default: 0,
      },
    },
    title: {
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
