import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tokens: { type: Number, default: 0 },
  badges: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastLogin: { type: String, default: null },
  learningProgress: { type: Number, default: 0 }
});

export default mongoose.model("User", userSchema);
