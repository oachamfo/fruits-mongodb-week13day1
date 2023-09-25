//import Mongoose db
const mongoose = require("mongoose");

//create Schema
const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readyToEat: Boolean,
});

//create model based on Schema
const Fruit = mongoose.model("Fruit", fruitSchema);

//export model
module.exports = Fruit;
