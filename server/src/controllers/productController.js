const Product = require("../model/Product");

const getAllProducts = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.sendStatus(406);
  }

  const products = await Product.find({ userId }).exec();

  if (!products?.length) {
    return res.sendStatus(204);
  }

  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const { name, price, itemCount, isSeasonal } = req.body;
  const { userId } = req.query;

  if (!name || !price || !itemCount || !userId) {
    return res.sendStatus(406);
  }

  try {
    const existingProduct = await Product.findOne({ name, userId }).exec();

    if (existingProduct) {
      if (
        price === existingProduct?.price &&
        itemCount > 0 &&
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

    if (itemCount < 1) {
      return res.sendStatus(400);
    }

    let product = null;

    if (isSeasonal) {
      product = await Product.create({
        name,
        price,
        itemCount,
        isSeasonal,
        userId,
      });
    } else {
      product = await Product.create({
        name,
        price,
        itemCount,
        userId,
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
  const { userId } = req.query;

  if (!id || !userId) {
    return res.sendStatus(406);
  }

  try {
    const updatedDoc = {};

    if (name) updatedDoc.name = name;
    if (price) updatedDoc.price = price;
    if (itemCount && itemCount > 0) updatedDoc.itemCount = itemCount;

    const product = await Product.findOneAndUpdate(
      { _id: id, userId },
      { $set: updatedDoc },
      { new: true }
    ).exec();

    if (product) {
      return res.status(200).json(product);
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(500);
  }
};

const decreaseProductCount = async (req, res) => {
  const { name, price, itemCount, isSeasonal } = req.body;
  const { userId } = req.query;

  if (!name || !price || !itemCount || !userId) {
    return res.sendStatus(406);
  }

  try {
    const existingProduct = await Product.findOne({ name, userId }).exec();

    const productItemCount = existingProduct?.itemCount - itemCount;

    if (existingProduct) {
      if (
        price === existingProduct?.price &&
        isSeasonal === existingProduct?.isSeasonal &&
        productItemCount > 0
      ) {
        await existingProduct
          .updateOne({ itemCount: existingProduct.itemCount - itemCount })
          .exec();

        const updatedProduct = await Product.findOne({
          _id: existingProduct.id,
          userId,
        });

        return res.status(200).json(updatedProduct);
      } else if (
        price === existingProduct?.price &&
        isSeasonal === existingProduct?.isSeasonal &&
        productItemCount === 0
      ) {
        await existingProduct.updateOne({ itemCount: 0 }).exec();

        const deletedProduct = await Product.findByIdAndDelete({
          _id: existingProduct._id,
          userId: existingProduct.userId,
        });

        return res.status(200).json(deletedProduct);
      } else {
        return res.sendStatus(400);
      }
    }

    res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteProduct = async (req, res) => {
  const { userId, id } = req.query;
  if (!id || !userId) {
    return res.sendStatus(406);
  }

  try {
    const product = await Product.findOneAndDelete({ _id: id, userId }).exec();

    if (product) {
      res.status(200).json(product);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  decreaseProductCount,
};
