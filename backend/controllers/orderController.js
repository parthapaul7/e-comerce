const Order = require("../models/Order");

exports.postOrder = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id , "products.productId": req.body.productId}).countDocuments();
  if(orders){
    const data = await Order.updateOne({userId:req.user.id, "products.productId": req.body.productId}, {
      $inc: {
        "products.$.quantity": req.body.quantity,
      }
    })
    return res.status(200).json(data)
  }
  const payload = {
    userId: req.user.id,
    products: [
      {
        productId: req.body.productId,
        quantity: req.body.quantity || 1,
      },
    ],
    address: req.body.address,
    amount: req.body.amount,
  };
  const newOrder = new Order(payload);

  try {
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.updateOne(
      {_id:req.params.id},
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.getFindOrder = async (req, res) => {

  try {
    const orders = await Order.find({ userId: req.params.userId }).populate(
      "products.productId"
    );
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}