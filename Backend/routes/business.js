import express from "express";
const router = express.Router({ mergeParams: true });

import wrapAsync from "../utils/wrapAsync.js";
import {
  createBusiness,
  updateBusiness,
  showBusiness,
  index,
  viewBusiness,
  deleteBusiness,
} from "../controllers/business.js";
import verifyRole, { verifyToken } from "../auth/auth.js";

router.delete("/:bid", verifyToken, wrapAsync(deleteBusiness));
router.get("/", verifyToken, verifyRole("owner"), wrapAsync(index));
router.get("/:bid", verifyToken, verifyRole("owner"), wrapAsync(showBusiness));

router.post("/new", verifyToken, verifyRole("owner"), createBusiness);
router.get(
  "/:bid/view",
  verifyToken,
  verifyRole("owner"),
  wrapAsync(viewBusiness)
);

router.post(
  "/:bid",
  verifyToken,
  verifyRole("owner"),
  wrapAsync(updateBusiness)
);

export default router;
