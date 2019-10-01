import mongoose from 'mongoose';

const { Schema } = mongoose;


const Tag = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }, // to do : add partial index on business
    place: {
      type: Schema.Types.ObjectId,
      ref: 'place',
    }, // to do : add partial index on business
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }, // to do : add partial index on business

            desc: {
                type: String,
                default: ""
            },
            rating: {
                type: Number,
                default: 0
            }
        }
    ]
  },
);

export default mongoose.model('tag', Tag);
