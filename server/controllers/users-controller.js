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

module.exports.update = function(req, res){
    console.log(req.body)
    var username = req.body.username;
    var userId = req.body._id;
    var password = req.body.password;
    var email = req.body.email;

    User.findById(userId,function(err, result){
        var user = result;
        user.username = username;
        user.password = password;
        user.email = email;
        user.save(function(err){
            if(err){
                res.json({status:500})
            }else{
                res.json({
                    username:username,
                    password:password,
                    email:email,
                    id:userId
                })
            }
        });
    });
}
