import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  allBusiness: [
    {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
  ],
});

//collection name,it's Schema
const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
