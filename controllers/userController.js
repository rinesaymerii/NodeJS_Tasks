const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const getDB = require("../config/rent");

const JWT_SECRET = process.env.JWT_SECRET;


exports.register = async (req, res) => {
  
  const { fullName, email, username, password } = req.body;
  if (!fullName || !email || !username || !password) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const db = await getDB();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });

    if (existingUser) return res.status(400).send("Username or email already in use.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { fullName, email, username, password: hashedPassword };
    const result = await usersCollection.insertOne(newUser);

    res.status(201).send({ message: "User registered successfully", userId: result.insertedId });
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Username and password are required.");

  try {
    const db = await getDB();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ username });

    if (!user) return res.status(400).send("User not found.");
    if (!(await bcrypt.compare(password, user.password))) return res.status(400).send("Invalid password.");

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Error logging in.");
  }
};


exports.getProfile = async (req, res) => {
  try {
    const db = await getDB();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(req.user.id) });

    if (!user) return res.status(404).send("User not found.");

    res.json({ fullName: user.fullName, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).send("Error fetching profile.");
  }
};
