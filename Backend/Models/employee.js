import mongoose from "mongoose";
const Schema = mongoose.Schema;

const today = new Date().toISOString().split("T")[0];

const employeeSchema = new Schema({
  businessId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  img: {
    original_filename: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    public_id: {
      type: String,
      required: true,
    },
    bytes: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  mobileNumber: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    default: "N/A",
    set: function (value) {
      return value === "" ? "N/A" : value; // Set default if empty string
    },
  },
  workpage: {
    type: String,
    require: true,
  },
});

//collection name,it's Schema
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
