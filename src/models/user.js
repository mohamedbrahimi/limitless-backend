import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const { Schema } = mongoose;
const User = new Schema(
  {
    phone: {
      type: String,
    },
    note: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      minlength: 5,
      maxlength: 50,
      match: /\S+@\S+\.\S+/,
    },
    username: {
      type: String, // todo username validation
    },
    password: {
      type: String,
      // required: 'password is required',
      // match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$/,
    },
    position: {
      type: String,
    },
    email_validation: {
      blocked: {
        type: Boolean,
        default: false,
      },
      sent_at: {
        type: Date,
        default: null,
      },
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    blacklisted: {
      is_blocked: {
        type: Boolean,
        default: false,
      },
      duration: { type: Number, default: 0 },
      reason: { type: String },
      blocked_by: { type: String },
      blocked_at: { type: Date },
    },
    permissions: {
      isSuperAdmin: {
        type: Boolean,
        default: false,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      autoApproval: {
        type: Boolean,
        default: false,
      },
      byPassBalance: {
        type: Boolean,
        default: false,
      },
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const hashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

User.pre('save', function (next) {
  const user = this;
  user.email = user.email.toLowerCase();
  if (!user.isModified('password')) return next();
  user.password = hashedPassword(user.password);
  return next();
});

User.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

User.index({ lastLoginAt: -1 });

export { User };
export default mongoose.model('user', User, 'user');
