const { postOrder, updateOrder, getFindOrder } = require("../controllers/orderController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, postOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);


//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getFindOrder);


// GET MONTHLY INCOME


module.exports = router;
