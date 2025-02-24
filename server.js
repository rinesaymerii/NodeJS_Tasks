const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", carRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB Connected!`);
  
});
