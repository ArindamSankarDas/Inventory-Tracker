const Product = require("../model/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({}).exec();

  if (!products?.length) {
    return res.status(404).json({ message: "No products available" });
  }

  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const { name, price, itemCount, isSeasonal } = req.body;

  if (!name || !price || !itemCount) {
    return res
      .status(406)
      .json({ message: "name, price and count can not be empty" });
  }

  try {
    const alreadyExists = await Product.findOne({ name }).exec();

    if (alreadyExists && price === alreadyExists.price) {
      await alreadyExists
        .updateOne({ itemCount: alreadyExists.itemCount + itemCount })
        .exec();

      return res.status(201).json({ message: "Inventory Increased" });
    }

    if (alreadyExists && price !== alreadyExists.price) {
      return res.status(400).json({
        message:
          "If name already exists and the price is different give it new name as it is a new product altogether due to price difference",
      });
    }

    let product = null;

    if (isSeasonal) {
      product = await Product.create({ name, price, itemCount, isSeasonal });
    } else {
      product = await Product.create({ name, price, itemCount });
    }

    if (product) {
      return res.status(201).json({ message: "Product recorded" });
    }

    res.status(400).json({ message: "Invalid data" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId, name, price, itemCount } = req.body;

  if (!productId) {
    return res.status(406).json({ message: "Filter data can not be empty" });
  }

  try {
    const updatedDoc = {};

    if (name) updatedDoc.name = name;
    if (price) updatedDoc.price = price;
    if (itemCount) updatedDoc.itemCount = itemCount;

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedDoc },
      { new: true }
    ).exec();

    if (product) {
      return res.status(200).json({ message: "Product update" });
    }

    res.status(400).json({ message: "Invalid data" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(406).json({ message: "Id field can not be empty" });
  }

  try {
    const product = await Product.findByIdAndDelete(id).exec();

    if (product) {
      res.status(200).json({ message: "Inventory decreased" });
    } else {
      res.status(400).json({ message: "Invalid data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
