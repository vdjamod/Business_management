import mongoose from "mongoose";
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  businessId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  productSale: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      saleUnit: {
        type: Number,
        default: 0,
      },
    },
  ],
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "SaleHistory",
    },
  ],
});

//collection name,it's Schema
const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
