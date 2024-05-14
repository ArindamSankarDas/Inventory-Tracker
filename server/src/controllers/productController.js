const Product = require("../model/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({}).exec();

  if (!products?.length) {
    return res.status(204).json({ message: "No products available" });
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
    const existingProduct = await Product.findOne({ name }).exec();

    if (existingProduct) {
      if (
        price === existingProduct?.price &&
        isSeasonal === existingProduct?.isSeasonal
      ) {
        await existingProduct
          .updateOne({
            itemCount: existingProduct.itemCount + itemCount,
          })
          .exec();

        return res.status(201).json(existingProduct);
      } else {
        return res.sendStatus(400);
      }
    }

    let product = null;

    if (isSeasonal) {
      product = await Product.create({
        name,
        price,
        itemCount,
        isSeasonal,
      });
    } else {
      product = await Product.create({
        name,
        price,
        itemCount,
      });
    }

    if (product) {
      return res.status(201).json(product);
    }

    res.sendStatus(422);
  } catch (err) {
    res.sendStatus(500);
  }
};

const updateProduct = async (req, res) => {
  const { id, name, price, itemCount } = req.body;

  if (!id) {
    return res.status(406).json({ message: "Filter data can not be empty" });
  }

  try {
    const updatedDoc = {};

    if (name) updatedDoc.name = name;
    if (price) updatedDoc.price = price;
    if (itemCount) updatedDoc.itemCount = itemCount;

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updatedDoc },
      { new: true }
    ).exec();

    if (product) {
      return res.status(200).json(product);
    }

    res.status(400).json({ message: "Invalid data" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const decreaseProductCount = async (req, res) => {
  const { name, price, itemCount, isSeasonal } = req.body;

  if (!name || !price || !itemCount) {
    return res.sendStatus(406);
  }

  try {
    const existingProduct = await Product.findOne({ name }).exec();

    if (existingProduct) {
      if (
        price === existingProduct?.price &&
        isSeasonal === existingProduct?.isSeasonal &&
        existingProduct?.itemCount - itemCount !== 0
      ) {
        await existingProduct
          .updateOne({
            itemCount: existingProduct.itemCount - itemCount,
          })
          .exec();

        return res.status(200).json(existingProduct);
      } else if (
        price === existingProduct?.price &&
        isSeasonal === existingProduct?.isSeasonal &&
        existingProduct?.itemCount - itemCount === 0
      ) {
        await existingProduct.updateOne({ $set: { itemCount: 0 } }).exec();
        res.status(200).json(existingProduct);
        await existingProduct.deleteOne().exec();

        return;
      } else {
        return res.sendStatus(400);
      }
    }
  } catch (error) {
    res.sendStatus(500);
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
      res.status(200).json(product);
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
  decreaseProductCount,
};
