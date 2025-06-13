import Employee from "../Models/employee.js";
import Business from "../Models/business.js";
import { comparePassword, encryptPassword, sendToken } from "../auth/auth.js";

export const login = async (req, res) => {
  let { email, password } = req.query;

  const employee = await Employee.findOne({ email: email });

  if (!employee) {
    res.send({ success: false, message: "Employee NOT found!!!" });
  }

  const result = comparePassword(password, employee.password);

  if (result) {
    const bid = employee.businessId;
    const business = await Business.findById(bid);

    const token = sendToken(
      business.owner,
      email,
      "employee",
      employee.workpage
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({ success: true, employee, id: employee._id });
  } else {
    res.send({ success: false, message: "Invalid Username or Password" });
  }
};

export const showEmployee = async (req, res) => {
  const { eid } = req.params;

  const employee = await Employee.findById(eid);

  if (employee) {
    res.send({ success: true, employee });
  } else {
    res.send({ success: false, message: "Employee NOT Found" });
  }
};
