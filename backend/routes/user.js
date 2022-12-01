const { updateUser, deleteUser, getFindUser, getAllUser, getStats } = require("../controllers/userController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);



//////////// ADMIN OPERATIONS ///////////////////

//FIND USER
router.get("/find/:id", verifyTokenAndAdmin, getFindUser);

//GET ALL USER
router.get("/", verifyTokenAndAdmin, getAllUser);

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, getStats);

module.exports = router;
