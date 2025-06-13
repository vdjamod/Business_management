import Business from "../Models/business.js";
import Inventory from "../Models/inventory.js";
import InvHistory from "../Models/invHistory.js";

export const getHistory = async (req, res) => {
  let { bid } = req.params;

  const business = await Business.findById(bid);
  const inventory = await Inventory.findById(business.inventory)
    .select("history")
    .populate({
      path: "history",
      options: { sort: { createdAt: -1 } },
    });

  res.send({ status: true, isToken: true, data: inventory.history });
};

export const getProducts = async (req, res) => {
  let { bid } = req.params;

  const business = await Business.findById(bid);

  let inventory = await Inventory.findById(business.inventory).populate(
    "products.product"
  );

  let arr = [];

  inventory.products.forEach((pdct) => {
    let name = pdct.product.name;
    let price = pdct.product.price;
    let revenue = pdct.product.revenue;
    let cost = pdct.product.cost;
    let stock = pdct.stock;
    let obj = {
      name: name,
      stock: stock,
      cost: cost,
      revenue: revenue,
      price: price,
    };
    arr.push(obj);
  });

  res.send({ status: true, isToken: true, data: arr });
};

export const addInventory = async (req, res) => {
  let { id, bid } = req.params;
  let { quantity } = req.body;
  let { history } = req.body;

  const business = await Business.findById(bid);

  let invHistory = new InvHistory();
  invHistory.businessId = bid;
  invHistory.history = history;
  invHistory.save();

  let inventory = await Inventory.findById(business.inventory);
  inventory.businessId = bid;

  inventory.history.push(invHistory._id);
  inventory.products.map((product, index) => {
    const qty = parseInt(quantity[index], 10);
    if (!isNaN(qty)) {
      product.stock += qty;
    }
  });

  await inventory.save();

  res.send({
    status: true,
    isToken: true,
    message: "Inventory add successfully",
  });
};

export const filterInventory = async (req, res) => {
  let { bid } = req.params;
  let { startDate, endDate } = req.query;

  const startOfDay = new Date(startDate);
  const endOfDay = new Date(endDate);
  endOfDay.setHours(23, 59, 59, 999);

  let invHistory = await InvHistory.find({
    businessId: bid,
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  }).sort({ createdAt: -1 });

  res.send({ status: true, isToken: true, data: invHistory });
};
