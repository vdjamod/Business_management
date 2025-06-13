import Product from "../Models/product.js";
import Business from "../Models/business.js";
import Inventory from "../Models/inventory.js";
import Sale from "../Models/sale.js";

export const index = async (req, res) => {
  let { bid } = req.params;

  try {
    const allProduct = await Product.find({ businessId: bid });

    res.send({ isToken: true, allProduct });
  } catch (error) {
    res.send({ status: false, message: "Failed to send all Products" });
  }
};

export const createProduct = async (req, res) => {
  let { bid } = req.params;

  try {
    const business = await Business.findById(bid);

    let newProduct = new Product(req.body);
    newProduct.inventory = business.inventory;
    newProduct.businessId = bid;
    newProduct.cost = req.body.price - req.body.revenue;
    await newProduct.save();

    business.product.push(newProduct);
    await business.save();

    const inventory = await Inventory.findById(business.inventory);
    inventory.products.push({ product: newProduct._id });
    await inventory.save();

    const sale = await Sale.findById(business.sale);
    sale.productSale.push({ product: newProduct._id });
    await sale.save();

    res.json({ status: true, message: "Product saved successfully" });
  } catch (error) {
    res.json({ status: false, message: "Failed to create product" });
  }
};

export const showProduct = async (req, res) => {
  let { pdctid } = req.params;

  let product = await Product.findById(pdctid);

  res.send({ isToken: true, product });
};

export const updateProduct = async (req, res) => {
  let { pdctid } = req.params;

  console.log(req.body);

  let product = await Product.findByIdAndUpdate(pdctid, { ...req.body });
  product.cost = req.body.price - req.body.revenue;
  await product.save();

  res.json({
    status: true,
    isToken: true,
    message: "Product updated successfully",
  });
};

export const destroyProduct = async (req, res) => {
  let { bid, pdctid } = req.params;

  let product = await Product.findByIdAndDelete(pdctid);

  if (!product) {
    res.json({
      isToken: true,
      status: false,
      message: "Failed to delete product",
    });
  }

  let business = await Business.findById(bid);
  business.product = business.product.filter((prev) => prev != pdctid);
  await business.save();

  let inventory = await Inventory.findById(business.inventory);
  inventory.products.forEach(async (obj) => {
    if (pdctid == obj["product"]) {
      inventory.products = inventory.products.filter(
        (obj) => obj.product != pdctid
      );
      await inventory.save(); // to persist changes
    }
  });

  let sale = await Sale.findById(business.sale);
  sale.productSale.forEach(async (obj) => {
    if (pdctid == obj["product"]) {
      console.log("matched");
      sale.productSale = sale.productSale.filter(
        (obj) => obj.product != pdctid
      );
      await sale.save();
    }
  });

  res.send({
    isToken: true,
    status: true,
    message: "Product delete successfully",
  });
};
