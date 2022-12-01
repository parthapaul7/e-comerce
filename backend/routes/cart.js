const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {

  const data = await Cart.find({ userId: req.user.id}).countDocuments();
  const isProdExist = await Cart.find({ userId: req.user.id, "products.productId": req.body.productId }).countDocuments();
  console.log(data, "this is data")

  if(isProdExist){
    const data = await Cart.updateOne({userId:req.user.id, "products.productId": req.body.productId}, {
      $inc: {
        "products.$.quantity": req.body.quantity,
      }
    })
    return res.status(200).json(data) 
  }

  if (data ) {
    try {
      const updatedCart = await Cart.updateOne({userId:req.user.id}, {
        $push: {
          products: { productId: req.body.productId, quantity: req.body.quantity },
        },
      });
      console.log(updatedCart, "this is updated cart")
      return res.status(200).json(updatedCart);
    } catch (err) {
      console.log(err, "this is error")
      return res.status(500).json(err);
    }
  }
  const payload = {
    userId: req.user.id,
    products: [
      {
        productId: req.body.productId,
        quantity: req.body.quantity,
      },
    ],
  };
  const newCart = new Cart(payload);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.updateOne({userId:req.user.id}, {
        $pull: {
          products: { productId: req.params.id },
        }
    });
    res.status(200).json({staus:"success", message:"Product has been deleted from cart"});
  } catch (err) {
    res.status(500).json({staus:"error", message:err});
  }
});

//GET USER CART
router.get("/user", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
