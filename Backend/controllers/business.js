import { deleteFromCloudinary } from "../helper/cloudinary.js";
import Business from "../Models/business.js";
import Employee from "../Models/employee.js";
import Inventory from "../Models/inventory.js";
import invHistory from "../Models/invHistory.js";
import Owner from "../Models/owner.js";
import Product from "../Models/product.js";
import Sale from "../Models/sale.js";
import SaleHistory from "../Models/saleHistory.js";

export const viewBusiness = async (req, res) => {
  let { bid } = req.params;
  let business = await Business.findById(bid);

  res.send({ isToken: true, business });
};

export const index = async (req, res) => {
  const id = req.id;
  const owner = await Owner.findById(id).populate("allBusiness");

  const business = owner.allBusiness;

  res.send({ isToken: true, business, owner });
};

export const updateBusiness = async (req, res) => {
  const { bid } = req.params;

  await Business.findByIdAndUpdate(bid, { ...req.body });

  res.send({ success: true, message: "Business Data Updated!!!" });
};

export const showBusiness = async (req, res) => {
  const { bid } = req.params;

  const business = await Business.findById(bid);

  res.send({ success: true, business });
};

export const createBusiness = async (req, res) => {
  const { name } = req.body;
  const id = req.id;

  const oldBusiness = await Business.findOne({ owner: id, name });
  if (oldBusiness) {
    res.send({ status: false, message: "Business already exist" });
  } else {
    let newBusiness = new Business(req.body);
    newBusiness.owner = id;

    // let { name, assets, haveEquity, amount, totalEMI, percentage, description } =
    //   req.body;
    // let newBusiness = new Business({
    //   name: name,
    //   assets: assets,
    //   haveEquity: haveEquity,
    //   debt: {
    //     amount: amount,
    //     totalEMI: totalEMI,
    //     percentage: percentage,
    //   },
    //   description: description,
    // });

    const inventory = new Inventory();
    await inventory.save();
    newBusiness.inventory = inventory;

    const sale = new Sale();
    await sale.save();
    newBusiness.sale = sale;

    await newBusiness.save();

    let owner = await Owner.findById(id);
    owner.allBusiness.push(newBusiness);
    await owner.save();

    res.send({ success: true, message: "Business created successfully" });
  }
};

export const deleteBusiness = async (req, res) => {
  const { bid } = req.params;
  const id = req.id;

  const owner = await Owner.findById(id);
  owner.allBusiness = owner.allBusiness.filter(
    (business) => business._id != bid
  );

  await owner.save();

  const business = await Business.findById(bid).populate("employee");
  const inventory = await Inventory.findById(business.inventory);
  const sale = await Sale.findById(business.sale);

  let productIds = [];
  let employeeIds = [];
  let saleHistoryIds = [];
  let inventoryHistoryIds = [];
  let publicIds = [];

  business.product.forEach((pdctid) => {
    productIds.push(pdctid);
  });

  business.employee.forEach((emp) => {
    employeeIds.push(emp._id);
    publicIds.push(emp.img.public_id);
  });

  inventory.history.forEach((ehis) => {
    inventoryHistoryIds.push(ehis);
  });

  sale.history.forEach((shid) => {
    saleHistoryIds.push(shid);
  });

  await Product.deleteMany({ _id: { $in: productIds } });
  await Employee.deleteMany({ _id: { $in: employeeIds } });
  await invHistory.deleteMany({ _id: { $in: inventoryHistoryIds } });
  await SaleHistory.deleteMany({ _id: { $in: saleHistoryIds } });
  const result = await deleteFromCloudinary(publicIds);
  console.log(result);

  await Inventory.findByIdAndDelete(business.inventory);
  await Sale.findByIdAndDelete(business.sale);
  await Business.findByIdAndDelete(bid);

  res.send({ success: true });
};
