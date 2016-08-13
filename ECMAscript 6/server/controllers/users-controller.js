const mongoose = require('mongoose')
let User = require('../models/users')
const path = require('path')
const fs = require('fs-extra')
const passport = require('passport')


let self = module.exports = {
    register:(req, res)=> {
        let user = new User()

        user.name = req.body.name;
        user.email = req.body.email;

        user.setPassword(req.body.password);

        user.save()
        let token;
        token = user.generateJwt();
            res.status(200);
            res.json({
              "token" : token
            })

    },
    login:(req, res)=>{
        passport.authenticate('local',(err, user, info)=>{
        let token
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err)
          return
        }

        // If a user is found
        if(user){
          token = user.generateJwt()
          res.status(200)
          res.json({
            "token" : token
          })
        } else res.status(401).json(info)
        })(req, res)
    },
    update:(req, res)=>{
        let username = req.body.name
        let userId = req.body._id
        let email = req.body.email
        User.findById(userId,(err, result)=>{
            let user = result
            user.name = username
            user.email = email
            user.save()
            let token = user.generateJwt()
            res.json({
                "token":token
            })
        })
    },
    profilePic:(req, res)=>{
        let file = req.files.file
        let userId = req.body.userId
        let uploadDate = new Date()
        uploadDate = uploadDate.toDateString()

        User.findById(userId,(err, result)=>{
            let user = result
            let savePath = '/uploads/' + userId  + uploadDate + file.name
            let tempPath = file.path
            let targetPath = path.join(__dirname,"../../uploads/" + userId + uploadDate + file.name)

            fs.rename(tempPath,targetPath,(err)=>{
                if(err) console.log(err)
                else{
                    user.image = savePath
                    user.save((err)=>{
                        if(err) res.json({status:500})
                        else{
                            let token = user.generateJwt()
                            res.json({
                                "token":token
                            })
                        }
                    })
                }
            })
        })
    }
}



