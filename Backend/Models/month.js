import mongoose from "mongoose";
const Schema = mongoose.Schema;

const monthSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  days: [
    {
      type: Schema.Types.ObjectId,
      ref: "Sale",
      ARR: {
        type: Number,
      },
    },
  ],
});

//collection name,it's Schema
const Month = mongoose.model("Month", monthSchema);

export default Month;
