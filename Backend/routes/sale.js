import express from "express";
const router = express.Router({ mergeParams: true });

import wrapAsync from "../utils/wrapAsync.js";
import { createSale, filterSale, getHistory } from "../controllers/sale.js";
import verifyRole, { verifyToken } from "../auth/auth.js";

router.post(
  "/",
  verifyToken,
  verifyRole("owner", "sale_management"),
  wrapAsync(createSale)
);

router.get(
  "/getHistory",
  verifyToken,
  verifyRole("owner", "sale_management"),
  wrapAsync(getHistory)
);
router.get(
  "/filter",
  verifyToken,
  verifyRole("owner", "sale_management"),
  wrapAsync(filterSale)
);

export default router;
