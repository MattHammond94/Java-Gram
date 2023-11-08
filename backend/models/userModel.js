import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dateOfBirth: {
    type: Date,
  },
  profilePicture: {
    type: String,
    default: '/Placeholder.jpg'
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  }
},
{
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.matchPasswords = async function(enteredPassword) {
  const match = await bcrypt.compare(enteredPassword, this.password);
  return match;
}

const User = mongoose.model('User', userSchema);

export default User;