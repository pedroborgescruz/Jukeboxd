import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
  },
  { timestamps: true }
);

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;

// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   clerkId: { type: String, required: true, unique: true },
//   firstName: String,
//   lastName: String,
//   avatar: String,
//   email: { type: String, required: true },
//   username: String,
// });

export default mongoose.models.User || mongoose.model('User', UserSchema);
