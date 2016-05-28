var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
    username:String,
    email:String,
    password:String,
    image:String
})
