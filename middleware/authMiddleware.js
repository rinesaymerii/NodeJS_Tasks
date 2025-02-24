const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const getDB = require("../config/rent");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).send("Access denied.");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = await getDB();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.id) });

    if (!user) return res.status(403).send("Invalid user.");
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send("Invalid token.");
  }
};

module.exports = authenticateJWT;
