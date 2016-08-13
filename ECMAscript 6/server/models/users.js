const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    image:String,
    });

userSchema.methods.setPassword = (password)=>{
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
}

userSchema.methods.validPassword = (password)=> {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
  return this.hash === hash
}

userSchema.methods.generateJwt = ()=> {
  let expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    image:this.image,
    exp: parseInt(expiry.getTime() / 1000),
  }, "lalala"); // DO NOT KEEP YOUR SECRET IN THE CODE!
}
module.exports = mongoose.model('User', userSchema)
