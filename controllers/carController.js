const getDB = require("../config/rent");

exports.getRentalCars = async (req, res) => {
  const { year, color, steering_type, number_of_seats } = req.query;
  const filters = {};

  if (year) filters.year = parseInt(year);
  if (color) filters.color = color;
  if (steering_type) filters.steering_type = steering_type;
  if (number_of_seats) filters.number_of_seats = parseInt(number_of_seats);

  try {
    const db = await getDB();
    const carsCollection = db.collection("cars");
    const cars = await carsCollection.find(filters).sort({ price_per_day: 1 }).toArray();
    res.json(cars);
  } catch (error) {
    res.status(500).send("Error fetching cars.");
  }
};
