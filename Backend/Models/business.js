// self.password=password
//         self.bid=bid
//         self.name=name
//         self.debt={"amount":0,"Total_EMI":0,"paidedEMI":0,"persentage":0}
//         self.haveEquity=0
//         self.assets=0
//         self.currentYearMonths=[]
//         self.years=[]
//         self.profit=0   #Last Month Profit
//         self.annualRevenueRunRate=0
//         self.currentYearRevenue=0
//         self.productObjectForBusiness=Products()
//         self.employeeObjectForBusiness=Employees()

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner'
  },
  name: {
    type: String,
    require: true,
  },
  debt: {
    amount: {
      type: Number,
    },
    totalEMI: {
      type: Number,
    },
    paidedEMI: {
      type: Number,
    },
    persentage: {
      type: Number,
    },
  },
  haveEquity: {
    type: Number,
    require: true,
  },
  assets: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  employee: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  sale: {
    type: Schema.Types.ObjectId,
    ref: "Sale",
  },
  inventory: {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
  },
  // date: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Year",
  //   },
  // ],
});

//collection name,it's Schema
const Business = mongoose.model("Business", businessSchema);

export default Business;
