import express from "express";
const router = express.Router({ mergeParams: true });

import wrapAsync from "../utils/wrapAsync.js";
import {
  addInventory,
  filterInventory,
  getProducts,
  getHistory,
} from "../controllers/inventory.js";
import verifyRole, { verifyToken } from "../auth/auth.js";

router
  .route("/")
  .get(
    verifyToken,
    verifyRole("owner", "inventory_management"),
    wrapAsync(getHistory)
  )
  .post(
    verifyToken,
    verifyRole("owner", "inventory_management"),
    wrapAsync(addInventory)
  );

router.get(
  "/filter",
  verifyToken,
  verifyRole("owner", "inventory_management"),
  wrapAsync(filterInventory)
);
router.get(
  "/get-products",
  verifyToken,
  verifyRole("owner", "inventory_management"),
  wrapAsync(getProducts)
);

export default router;
