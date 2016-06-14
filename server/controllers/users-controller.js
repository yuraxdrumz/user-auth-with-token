var mongoose = require('mongoose');
var User = require('../models/users');
var path = require('path');
var fs = require('fs-extra');
var passport = require('passport');


var self = module.exports = {
    register:function(req, res) {
        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;

        user.setPassword(req.body.password);

        user.save()
        var token;
        token = user.generateJwt();
            res.status(200);
            res.json({
              "token" : token
            });

    },
    login:function(req, res) {
        passport.authenticate('local', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }

        // If a user is found
        if(user){
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
        })(req, res);
    },
    update:function(req, res){
        var username = req.body.name;
        var userId = req.body._id;
        var email = req.body.email
        User.findById(userId,function(err, result){
            var user = result;
            user.name = username;
            user.email = email
            user.save();
            token = user.generateJwt()
            res.json({
                "token":token
            })
        });
    },
    profilePic:function(req, res){
        var file = req.files.file;
        var userId = req.body.userId
        var uploadDate = new Date();
        uploadDate = uploadDate.toDateString();

        User.findById(userId,function(err, result){
            var user = result
            var savePath = '/uploads/' + userId  + uploadDate + file.name;
            var tempPath = file.path
            var targetPath = path.join(__dirname,"../../uploads/" + userId + uploadDate + file.name);

            fs.rename(tempPath,targetPath,function(err){
                if(err){
                    console.log(err)
                }else{
                    user.image = savePath
                    user.save(function(err){
                        if(err){
                            res.json({status:500})
                        }else{
                            var token = user.generateJwt();
                            res.json({
                                "token":token
                            })
                        }
                    });
                }
            })
        })
    }
}



