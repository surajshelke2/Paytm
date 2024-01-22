const { default: mongoose } = require("mongoose");
const Account = require("../model/account");
const User = require("../model/user");
const getBalance = async (req, res) => {
  const { user } = req.body;

  if (!user) return;
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: account.balance,
  });
};

module.exports = { getBalance };

const transfer = async (req, res) => {
  let { toUser, amount } = req.body;

  toUser = toUser.toLowerCase();

  const session = await mongoose.startSession();
  //checking if the users are valid or not .
  const toSender = await Account.findOne({ userId: req.userId }).session(session);


  if (!toSender){
    await session.abortTransaction();
    return res.status(400).json({});
  } 
  

  // check the User has sufficent amount;

  if (!toSender || toSender.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({ error: "Insufficient Balance !!" });
  }

  const toReceiver = await Account.findOne({ userId: toUser }).session(session);
  if (!toReceiver){
    await session.abortTransaction();
    return res.status(400).json({});
  } 

  try {
    toSender.balance -= amount;
    await toSender.save({ session });

    toReceiver.balance += amount;
    await toReceiver.save({ session });

    await session.commitTransaction();
    session.endSession();
    res
      .status(200)
      .json({ message: "Transaction successfull", success: true });

   
  } catch (error) {
    res.status(400).json({ success: false });
  }
};


module.exports ={transfer,getBalance}