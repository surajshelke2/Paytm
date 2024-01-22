const { default: mongoose } = require("mongoose");
const Account = require("../model/account");
const User = require("../model/user");
const getBalance = async (req, res) => {
  console.log("Hello");
  console.log(req.userId);
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    success: true,
    balance: account.balance,
  });
};

module.exports = { getBalance };
const transfer = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    if (!session) {
      throw new Error("Failed to create a session");
    }

    await session.withTransaction(async () => {
      const { toUser, amount } = req.body;
      console.log("Reciver "+toUser);

      const toSender = await Account.findOne({ userId: req.userId }).session(session);
      console.log("Sender "+req.userId);
      if (!toSender) {
        throw new Error("Sender not present!!");
      }

      if (toSender.balance < amount) {
        throw new Error("Insufficient Balance!!");
      }

      const toReceiver = await Account.findOne({ userId: toUser }).session(session);
      if (!toReceiver) {
        throw new Error("Receiver not present!!");
      }

      toSender.balance -= amount;
      await toSender.save();

      toReceiver.balance += amount;
      await toReceiver.save();
    });

    session.endSession();
    res.status(200).json({ message: "Transaction successful", success: true });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(400).json({ success: false, message: "Transaction failed" });
  }
};


module.exports = { transfer, getBalance };
