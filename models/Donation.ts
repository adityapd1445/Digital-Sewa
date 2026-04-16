import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
