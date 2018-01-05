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
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);

        return Dishes.collection.drop();
    })
    .then(() => {
        return mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err);
    });
});