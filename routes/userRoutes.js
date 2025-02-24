const express = require("express");
const { register, login, getProfile } = require("../controllers/userController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/my-profile", authenticateJWT, getProfile);

module.exports = router;
