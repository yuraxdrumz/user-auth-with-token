var mongoose = require('mongoose');

module.exports = mongoose.model('Tweet',{
    user:String,
    userId:String,
    content:String,
    userImage:String,
    Date:{type:Date,default:Date.now},
    likes:Number
})
