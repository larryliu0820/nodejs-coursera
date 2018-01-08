const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
var connection = mongoose.connect(url);
connection.then(() => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then(dish => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish.id, {
            $set: { description: 'Updated test'}
        },{ 
            new: true
        })
        .exec();
    })
    .then(dish => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });
        return dish.save();
    })
    .then(dish => {
        console.log(dish);

        return Dishes.collection.drop();
    })
    .then(() => {
        return mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err);
    });
});