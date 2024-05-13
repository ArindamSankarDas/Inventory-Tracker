const Transaction = require("../model/Transaction");

const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find({}).exec();

  if (!transactions?.length) {
    return res.sendStatus(204);
  }

  res.status(200).json(transactions);
};

const initiateNewTransaction = async (req, res) => {
  const { transactionType, customer_info, product_info } = req.body;

  if (!transactionType || !customer_info || !product_info) {
    return res.sendStatus(406);
  }

  try {
    const transaction = await Transaction.create({
      transactionType,
      customer_details: {
        ...customer_info,
      },
      product_details: {
        ...product_info,
      },
    });

    if (!transaction) {
      return res.sendStatus(422);
    }

    res.status(201).json(transaction);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = { getAllTransactions, initiateNewTransaction };
