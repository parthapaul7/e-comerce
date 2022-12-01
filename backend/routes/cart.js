const { postCart, updateCart, deleteCart, getUserCart } = require("../controllers/cartController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, postCart);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

//GET USER CART
router.get("/user", verifyTokenAndAuthorization, getUserCart);



module.exports = router;
