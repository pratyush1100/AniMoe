import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userid: {
      type: Number,
      required: true,
    },
    type: String,
  },
  { timestamps: true }
);
export default mongoose.model("user", userSchema);
