//import Mongoose db
const mongoose = require("mongoose");

//create Schema
const vegetableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readyToEat: Boolean,
});

//create model based on Schema
const Vegetable = mongoose.model("Vegetable", vegetableSchema);

//export model
module.exports = Vegetable;
