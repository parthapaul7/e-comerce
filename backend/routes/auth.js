const router = require("express").Router();
const {postRegister, postLogin} = require("../controllers/authController");

//REGISTER
router.post("/register", postRegister);

//LOGIN

router.post("/login", postLogin);

module.exports = router;
