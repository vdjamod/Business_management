import mongoose from "mongoose";
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      stock: {
        type: Number,
        default: 0,
      },
    },
  ],
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "InvHistory",
    },
  ],
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
