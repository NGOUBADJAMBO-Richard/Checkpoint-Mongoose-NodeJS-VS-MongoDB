
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//environment variables
require("dotenv").config();

// console.log(process.env.MONGO_URI)
const Person = require("./models/person");

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connexion MongoDB OK"))
  .catch((err) => console.error("Une erreur est survenue => .", err));

// Create a document instance using the Person constructor you built before. Pass to the constructor an object having the fields name, age, and favoriteFoods. Their types must conform to the ones in the Person Schema. Then call the method document.save() on the returned document instance. Pass to it a callback using the Node convention. 

const newPerson = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger', 'Salad']
    });
      
newPerson.save(function(err, data) {
    if (err) {
        console.error('Error saving the person:', err);
    } else {
         console.log('Person saved successfully:', data);
    }
});

// Sometimes you need to create many instances of your models, e.g. when seeding a database with initial data. Model.create() takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument and saves them all in the DB.

// Create several people with Model.create(), using the function argument arrayOfPeople.

function createPeople(arrayOfPeople) {
    Person.create(arrayOfPeople, function(err, people){
        if(err){
            console.error('Error creating people:', err);
        }else {
            console.log('People created successfully:', people);
        }
    });
}

// Example usage:
const arrayOfPeople = [
    { name: 'John Doe', age: 30, favoriteFoods: ['Pizza', 'Burger'] },
    { name: 'Jane Doe', age: 25, favoriteFoods: ['Salad', 'Pasta'] },
    { name: 'Jim Beam', age: 35, favoriteFoods: ['Steak', 'Fries'] }
  ];
  
  createPeople(arrayOfPeople);

//  Find all the people having a given name, using Model.find() -> [Person]
function findPeopleByName(name, callback){
    Person.find({name: name}, function(err, people){
        if(err) {
            console.error('Error finfding people:',err);
            callback(err, null);
        }else {
            console.log('People found:', people);
            callback(null, people);
        }
});
}

// Example usage:
findPeopleByName('John Doe', function(err, people) {
    if (err) {
      // handle error
    } else {
      // handle success
      console.log(people);
    }
  });

//  Find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as a search key.

function findPeopleByFavoritFoods(food, callback){
    Person.findOne({favoriteFoods: food}, function(err, person){ 
    if(err) {
        console.error('Error finding person:', err);
        callback(err, null);
    }else {
        console.log('Person found:', person);
        callback(null,people);
    }
});
}


// Example usage:
findPersonByFavoriteFood('Pizza', function(err, person) {
    if (err) {
      // handle error
    } else {
      // handle success
      console.log(person);
    }
  });

// Find the (only!!) person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.

function findPeopleById(id, callback){
    Person.findById(id, function(err, person){
        if (err){
            console.error('Error finding person:', err);
            callback(err,null);
        } else{
            console.log('People found:', people);
            callback(null, people);
        }
});
}

// Example usage:
const personId = '60c72b2f5f1b2c001c8e4d2a'; // Replace with an actual ObjectId
findPersonById(personId, function(err, person) {
  if (err) {
    // handle error
  } else {
    // handle success
    console.log(person);
  }
});

// Find a person by _id ( use any of the above methods ) with the parameter personId as a search key. Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()). Then - inside the find callback - save() the updated Person.

// Note: This may seem tricky, if, in your Schema, you declared favoriteFoods as an Array, without specifying the type (i.e. [String]). In that case, favoriteFoods defaults to Mixed type, and you have to manually mark it as edited using document.markModified('edited-field'). See Mongoose documentation

function addFavoriteFood(personId, callback){
    Person.findById(personId, function(err, person) {
        if (err){
            console.error('Error finding person:', err);
            callback(err,null);
            return;
        }
        if(!person){
            console.error('Person not found:', personId);
            callback(new Error('Person not found'), null);
            return;
        }

        // Add 'Hamburger' to the list of favorite foods
        person.favoriteFoods.push('hamburger');

        // Save the updated person
        person.save(function(err, updatePerson) {
            if(err){
                console.error('Error saving person:', err);
                callback(err,null);
            } else {
                console.log('Updated person:', updatePerson);
                callback(null, updatePerson);
            }
        })
    });
} 

// Example usage:
const person2Id = '60d5f4842ab79c44d4fbc2a9'; // Example ID
addFavoriteFood(personId, function(err, person) {
  if (err) {
    // handle error
  } else {
    // handle success
    console.log(person);
  }
});

// Find a person by Name and set the person's age to 20. Use the function parameter personName as a search key.

// Note: You should return the updated document. To do that you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate(). By default, these methods return the unmodified object.
function findPersonByName(personName, callback){
    Person.findOneAndUpdate( 
    { name: personName }, // Search criteria
    { age: 20 }, // Update action
    { new: true }, // Options: return the updated document 
    function(err, updatedPerson) {
        if(err){
            console.error('Error finding person:', err);
            callback(err,null);
        }else{
            console.log('Updated person:', updatedPerson);
            callback(null, updatedPerson);
        }
    });
}

// Example usage:
updatePersonAgeByName('John Doe', function(err, person) {
    if (err) {
      // handle error
    } else {
      // handle success
      console.log(person);
    }
  });

// Delete one person by the person's _id. You should use one of the methods findByIdAndRemove() or findOneAndRemove(). They are like the previous update methods. They pass the removed document to the DB. As usual, use the function argument personId as the search key.
 function deletePeopleById(id, callback) {
    Person.findByIdAndRemove(id, function(err, deletedPerson) {
        if (err) {
            console.error('Error deleting person:', err);
            callback(err,null);
        }else {
            console.log('Deleted person:', deletedPerson);
            callback(null, deletedPerson);
        }
    });
 }

 // Example usage:
const person1Id = '60d5f4842ab79c44d4fbc2a9'; // Example ID
deletePersonById(personId, function(err, person) {
  if (err) {
    // handle error
  } else {
    // handle success
    console.log(person);
  }});

// Delete all the people whose name is “Mary”, using Model.remove(). Pass it to a query document with the name field set, and of course, do a callback.

//   Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the done() callback, since we use it in tests.

function deletePeopleByName(name, callback) {
    Person.remove({ name: name }, function(err, result) {
      if (err) {
        console.error('Error deleting people:', err);
        callback(err, null);
      } else {
        console.log('Delete operation result:', result);
        callback(null, result);
      }
    });
  }
  
  // Example usage:
  deletePeopleByName('Mary', function(err, result) {
    if (err) {
      // handle error
    } else {
      // handle success
      console.log(result);
    }
  });

// Find people who like burritos. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().

function findPeopleByFavoritFood(food){
    // Assuming you have a Mongoose model called 'Person' with fields 'name', 'age', and 'favoriteFood'
    Person.find({ favoriteFood: 'burrito' })
.sort({ name: 1 }) // Sort by name in ascending order
.limit(2) // Limit the results to 2 documents
.select('-age') // Hide the 'age' field
.exec(function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
}