import mongoose from "mongoose";
const Schema = mongoose.Schema;

const invHistorySchema = new Schema({
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },
  history: [
    {
      name: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const invHistory = mongoose.model("InvHistory", invHistorySchema);
export default invHistory;
