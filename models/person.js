const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person

