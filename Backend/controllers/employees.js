import { decryptPassword, encryptPassword } from "../auth/auth.js";
import {
  deleteFromCloudinary,
  uplaodOnCloudinary,
} from "../helper/cloudinary.js";
import Business from "../Models/business.js";
import Employee from "../Models/employee.js";

export const index = async (req, res) => {
  let { bid } = req.params;

  const allEmployee = await Employee.find({
    businessId: bid,
  });

  res.send({ isToken: true, allEmployee });
};

export const showEmployee = async (req, res) => {
  let { eid } = req.params;

  let employee = await Employee.findById(eid);
  employee.password = decryptPassword(employee.password);
  res.send({ isToken: true, employee });
};

export const createEmployee = async (req, res) => {
  const result = JSON.parse(req.body.data);
  let { bid } = req.params;
  const uploadedFile = await uplaodOnCloudinary(req.file.path);
  console.log(uploadedFile);

  let newEmployee = new Employee(result);
  newEmployee.img = uploadedFile;
  newEmployee.password = encryptPassword(result.password);
  newEmployee.businessId = bid;
  await newEmployee.save();

  const business = await Business.findById(bid);
  business.employee.push(newEmployee);
  await business.save();

  res.json({
    success: true,
    isToken: true,
    message: "Employee added successfully",
  });
};

export const updateEmployee = async (req, res) => {
  let { eid } = req.params;
  const file = req.file;
  const data = JSON.parse(req.body.data);

  let employee = await Employee.findById(eid);

  if (file) {
    const deletedFile = await deleteFromCloudinary(employee.img.public_id);
    console.log(deletedFile);
  }

  employee = await Employee.findByIdAndUpdate(eid, data);

  if (file) {
    const uploadedFile = await uplaodOnCloudinary(file.path);
    console.log(uploadedFile);
    employee.img = uploadedFile;
  }

  employee.password = encryptPassword(data.password);
  await employee.save();

  res.json({
    success: true,
    isToken: true,
    message: "Employee updated successfully",
  });
};

export const destroyEmployee = async (req, res) => {
  const { bid, eid } = req.params;

  await Employee.findByIdAndDelete(eid);

  let business = await Business.findById(bid);
  business.employee = business.employee.filter((prev) => prev != eid);
  await business.save();

  res.json({
    success: true,
    isToken: true,
    message: "Employee deleted successfully",
  });
};
