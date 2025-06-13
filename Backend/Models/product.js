import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  businessId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  revenue: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  inventory: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
});

//collection name,it's Schema
const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

export default Product;
