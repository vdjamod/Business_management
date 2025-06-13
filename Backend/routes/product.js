import express from "express";
const router = express.Router({ mergeParams: true });
import wrapAsync from "../utils/wrapAsync.js";
import {
  createProduct,
  destroyProduct,
  index,
  showProduct,
  updateProduct,
} from "../controllers/products.js";
import verifyRole, { verifyToken } from "../auth/auth.js";

router.get(
  "/",
  verifyToken,
  verifyRole("owner", "product_management"),
  wrapAsync(index)
); // GET
router.post(
  "/new",
  verifyToken,
  verifyRole("owner", "product_management"),
  wrapAsync(createProduct)
); // new form - POST

router
  .route("/:pdctid")
  .get(
    verifyToken,
    verifyRole("owner", "product_management"),
    wrapAsync(showProduct)
  ) // edit - GET
  .put(
    verifyToken,
    verifyRole("owner", "product_management"),
    wrapAsync(updateProduct)
  ) // Edit - POST
  .delete(
    verifyToken,
    verifyRole("owner", "product_management"),
    wrapAsync(destroyProduct)
  ); // destroy route - DELETE

export default router;
