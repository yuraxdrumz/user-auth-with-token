var mongoose = require('mongoose')
var User = require('../models/users')

module.exports.register = function(req, res){
    var user = new User(req.body) ;
    user.save();
    res.json(req.body)
}

module.exports.login = function(req, res){
    User.find(req.body,function(err, results){
        if(results && results.length === 1){
            var foundUser = results[0];
            res.json({
                _id:foundUser._id,
                email:foundUser.email,
                username:foundUser.username
            });
        }
    })
}
