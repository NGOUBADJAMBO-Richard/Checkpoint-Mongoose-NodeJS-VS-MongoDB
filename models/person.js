const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PersonSchema = new Schema({
    name: { types: String, required: true},
    age: Number,
    favoriteFoods: [string],
});

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person