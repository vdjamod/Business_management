import SaleHistory from "../Models/saleHistory.js";
import Sale from "../Models/sale.js";
import Inventory from "../Models/inventory.js";
import Business from "../Models/business.js";

export const getHistory = async (req, res) => {
  let { bid } = req.params;

  let business = await Business.findById(bid);

  let sale = await Sale.findById(business.sale)
    .select("history")
    .populate({
      path: "history",
      options: { sort: { createdAt: -1 } },
    });

  res.send({ status: true, isToken: true, data: sale.history });
};

export const createSale = async (req, res) => {
  let { bid } = req.params;
  const { history } = req.body;
  const { quantity } = req.body;
  const { mcost, ocost } = req.body;

  const business = await Business.findById(bid);

  let saleHistory = new SaleHistory();
  saleHistory.businessId = bid;
  saleHistory.history = history;
  saleHistory.mcost = mcost;
  saleHistory.ocost = ocost;
  saleHistory.save();

  let inventory = await Inventory.findById(business.inventory);
  inventory.products.map((product, index) => {
    const qty = parseInt(quantity[index], 10);
    if (!isNaN(qty)) {
      product.stock -= qty;
    }
  });
  await inventory.save();

  let sale = await Sale.findById(business.sale);
  sale.businessId = bid;

  sale.history.push(saleHistory._id);
  await sale.save();

  res.send({
    status: true,
    isToken: true,
    message: "Sale data updated successfully",
  });
};

export const filterSale = async (req, res) => {
  let { bid } = req.params;
  let { startDate, endDate } = req.query;

  const startOfDay = new Date(startDate);
  const endOfDay = new Date(endDate);
  endOfDay.setHours(23, 59, 59, 999);

  let saleHistory = await SaleHistory.find({
    businessId: bid,
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  }).sort({ createdAt: -1 });

  res.send({ status: true, isToken: true, data: saleHistory });
};
