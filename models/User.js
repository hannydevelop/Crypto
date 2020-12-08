/*Using an ORM (mongoose) to interact with a simple user database model*/
const mongoose = require('mongoose');

var User = mongoose.model('User', {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    username: { type: String },
    role: { type: String },
});

//export dtabase model(user)
module.exports = { User };