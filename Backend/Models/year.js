import mongoose from "mongoose";
const Schema = mongoose.Schema;

const yearSchema = new Schema({
  number: {
    type: Number,
    require: true,
  },
  month: [
    {
      type: Schema.Types.ObjectId,
      ref: "Month",
    },
  ],
});

//collection name,it's Schema
const Year = mongoose.model("Year", yearSchema);

export default Year;
