import mongoose from "mongoose";
const Schema = mongoose.Schema;

const saleHistorySchema = new Schema({
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
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
      revenue: {
        type: Number,
        required: true,
      },
    },
  ],
  mcost: {
    type: Number,
    required: true,
  },
  ocost: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SaleHistory = mongoose.model("SaleHistory", saleHistorySchema);
export default SaleHistory;
