var mongoose = require('mongoose')
var User = require('../models/users')
var path = require('path')
var fs = require('fs-extra')

module.exports.register = function(req, res){
    var user = new User(req.body) ;
    user.save();
    res.json({
        userId:user._id,
        username:user.username,
        email:user.email
    })
}

module.exports.login = function(req, res){
    User.find(req.body,function(err, results){
        if(results && results.length === 1){
            var foundUser = results[0];
            res.json({
                _id:foundUser._id,
                email:foundUser.email,
                username:foundUser.username,
                image:foundUser.image
            });
        }
    })
}

module.exports.update = function(req, res){

    var username = req.body.username;
    var userId = req.body._id;
    var email = req.body.email

    User.findById(userId,function(err, result){
        var user = result;
        user.username = username;
        user.email = email
        user.save();
        res.json({
            username:user.username,
            _id:user._id,
            email:user.email
        })
    });
}

module.exports.profilePic = function(req, res){
    var file = req.files.file;
    var userId = req.body.userId
    var uploadDate = new Date();
    uploadDate = uploadDate.toDateString();

    User.findById(userId,function(err, result){
        var user = result
        var savePath = '/uploads/' + user._id  + uploadDate + file.name;
        var tempPath = file.path
        var targetPath = path.join(__dirname,"../../uploads/" + user._id + uploadDate + file.name);

        fs.rename(tempPath,targetPath,function(err){
            if(err){
                console.log(err)
            }else{
                user.image = savePath
                user.save(function(err){
                    if(err){
                        res.json({status:500})
                    }else{
                        res.json({status:200})
                    }
                });
            }
        })
    })

}
