import express from "express";
const router = express.Router({ mergeParams: true });
import wrapAsync from "../utils/wrapAsync.js";
import { login, showEmployee } from "../controllers/employeeDash.js";
import verifyRole, { verifyToken } from "../auth/auth.js";

router.get("/login", wrapAsync(login));
router.get(
  "/:eid",
  verifyToken,
  verifyRole("employee", "employee_management"),
  wrapAsync(showEmployee)
);

export default router;
