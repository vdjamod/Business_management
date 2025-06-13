import express from "express";
const router = express.Router({ mergeParams: true });
import wrapAsync from "../utils/wrapAsync.js";
import {
  destroyEmployee,
  index,
  createEmployee,
  showEmployee,
  updateEmployee,
} from "../controllers/employees.js";
import verifyRole, { verifyToken } from "../auth/auth.js";
import { upload } from "../helper/multer.js";

router.get(
  "/",
  verifyToken,
  verifyRole("owner", "employee_management"),
  wrapAsync(index)
); // GET

router.post(
  "/new",
  verifyToken,
  verifyRole("owner", "employee_management"),
  upload.single("file"),
  wrapAsync(createEmployee)
); // New Form - POST

router
  .route("/:eid")
  .get(
    verifyToken,
    verifyRole("owner", "employee_management"),
    wrapAsync(showEmployee)
  ) // Edit Route - GET
  .put(
    verifyToken,
    verifyRole("owner", "employee_management"),
    upload.single("file"),
    wrapAsync(updateEmployee)
  ) // Update Route - POST
  .delete(
    verifyToken,
    verifyRole("owner", "employee_management"),
    wrapAsync(destroyEmployee)
  ); // Delete Route - DELETE

export default router;
