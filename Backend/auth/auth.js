import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET;

export function encryptPassword(password) {
  const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey);
  return encryptedPassword.toString();
}

export function decryptPassword(encryptedPassword) {
  const password = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return password.toString(CryptoJS.enc.Utf8);
}

export function comparePassword(password, encryptedPassword) {
  const decryptedPassword = decryptPassword(encryptedPassword, secretKey);

  if (password === decryptedPassword) return true;

  return false;
}

export const sendToken = (id, email, role, workpage = "all") => {
  const token = jwt.sign(
    {
      id,
      email,
      role,
      workpage,
    },
    process.env.SECRET,
    { expiresIn: "24h" }
  );

  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.send({ isToken: false, message: "Token Not Found" });
  } else {
    const result = jwt.verify(token, secretKey);
    req.id = result.id;
    req.workpage = result.workpage;
    req.email = result.email;
    req.role = result.role;

    next();
  }
};

export default function verifyRole(role, workpage) {
  return (req, res, next) => {
    console.log(req.workpage);
    console.log(workpage);
    console.log(role);
    console.log(req.role);
    if (!req.role) {
      res.send({ success: false, message: "User NOT Found" });
    }

    if (req.role === role || workpage == req.workpage) {
      next();
    } else {
      res.send({ success: false, message: "UnAuthorized User" });
    }
  };
}
