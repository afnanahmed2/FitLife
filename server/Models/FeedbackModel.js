import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: String, required: true }, // <-- هنا غيرنا النوع من Number إلى String
  description: { type: String, required: true },
}, { timestamps: true });

const FeedbackModel = mongoose.model("feedbacks", FeedbackSchema);
export default FeedbackModel;

