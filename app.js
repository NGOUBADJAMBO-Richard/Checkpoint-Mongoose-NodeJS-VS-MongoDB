
const express = require('express');
var mongoose = require('mongoose');
var app = express();

//environment variables
require(dotenv).config();

//database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
const connection = mongoose.connection;
connection.once(open, () => {
    console.log('Connected Database Successfully');
    });
    app.listen(3000,function(req,res){
    console.log('Server is started on port 3000');
    });

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
            callback(null,people);
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