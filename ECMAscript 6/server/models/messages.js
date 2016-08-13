const mongoose = require('mongoose')

module.exports = mongoose.model('Message',{
    username:String,
    message:String
});
