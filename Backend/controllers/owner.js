import Owner from "../Models/owner.js";
import {
  comparePassword,
  decryptPassword,
  encryptPassword,
  sendToken,
} from "../auth/auth.js";
import { client } from "../utils/redisClient.js";
import sendMail from "../helper/sendMail.js";

export const signin = async (req, res) => {
  const { email, password } = req.query;

  let owner = await Owner.findOne({ email });

  if (!owner) {
    res.send({ success: false, message: "Invalid email or password" });
  }

  const result = comparePassword(password, owner.password);
  const token = sendToken(owner._id, email, "owner", "all");

  if (result) {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send({
      success: true,
      id: owner._id,
      token: token,
      message: "Owner found",
    });
  } else {
    res.send({ success: false, message: "Invalid email or password" });
  }
};

export const showOwner = async (req, res) => {
  const id = req.id;

  const owner = await Owner.findById(id);
  owner.password = decryptPassword(owner.password);

  res.send({ success: true, owner });
};

export const updateOwner = async (req, res) => {
  const id = req.id;
  const { password } = req.body;

  const owner = await Owner.findByIdAndUpdate(id, { ...req.body });
  owner.password = encryptPassword(password);
  await owner.save();

  res.send({ success: true, message: "Owner detail updated successfully" });
};

export const registration = async (req, res) => {
  console.log("first");
  const data = req.body;
  const oldOwner = await Owner.findOne({ email: data.email });

  if (oldOwner) {
    res.send({ success: false, message: "Email already exist" });
  } else {
    let owner = new Owner(req.body);
    owner.password = encryptPassword(data.password);

    const token = sendToken(owner._id, data.email, "owner", "all");
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    await owner.save();
    res.send({
      success: true,
      id: owner._id,
      message: "Owner registration successfully",
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const owner = await Owner.findOne({ email });
  const result = await client.get(`${owner._id}`);

  if (result == otp) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
};

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const owner = await Owner.findOne({ email });

  if (owner) {
    const result = await sendMail(
      email,
      "Forget password OTP",
      `Hello ${owner.name} !!!, Yout OTP is to forget password is: ${otp}`
    );

    const key = `${owner._id}`;
    await client.set(key, otp, { EX: 120 });

    const id = encryptPassword(`${owner._id}`);

    res.cookie("id", id, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    });

    res.send({ success: true, message: "OTP sent successfully" });
  } else {
    res.send({ success: false, message: "Owner not registered..." });
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  let id = req.cookies.id;

  if (!id) {
    res.send({ success: false, message: "Session time out..." });
  }

  id = decryptPassword(id);
  console.log(id);

  const password = encryptPassword(newPassword);

  if (!id) {
    res.send({ success: false, message: "Session time out..." });
  } else {
    const owner = await Owner.findById(id);
    owner.password = password;
    await owner.save();

    res.send({ success: true, message: "Password Updated Successfully" });
  }
};
