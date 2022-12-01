const {
  postProduct,
  updateProduct,
  deleteProduct,
  getFindProduct,
  getProduct,
} = require("../controllers/productController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

//Find PRODUCT
router.get("/find/:id", getFindProduct);

//GET ALL PRODUCTS with QUERIES
router.get("/", getProduct);

/// only admins can do these operations
//CREATE

router.post("/", verifyTokenAndAdmin, postProduct);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

module.exports = router;
