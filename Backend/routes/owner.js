import express from "express";
const router = express.Router({ mergeParams: true });

import wrapAsync from "../utils/wrapAsync.js";
import {
  registration,
  resetPassword,
  sendOTP,
  signin,
  showOwner,
  verifyOtp,
  updateOwner,
} from "../controllers/owner.js";
import verifyRole, { verifyToken } from "../auth/auth.js";

router.get("/", verifyToken, verifyRole("owner"), wrapAsync(showOwner));
router.post(
  "/update",
  verifyToken,
  verifyRole("owner"),
  wrapAsync(updateOwner)
);
router.get("/signin", wrapAsync(signin));
router.post("/send-mail", wrapAsync(sendOTP));
router.post("/reset-pass", wrapAsync(resetPassword));
router.post("/verify-otp", wrapAsync(verifyOtp));
router.post("/registration", wrapAsync(registration));

export default router;
