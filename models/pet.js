const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  // Well define our pets schema here key: value
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  breed: String,
  isAdopted: {
    type: Boolean,
    default: false
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
