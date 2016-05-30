var express              = require('express');
var app                  = express();
var mongoose             = require('mongoose');
var bodyParser           = require('body-parser');
var port                 = process.env.PORT || 3000;
var UserCtrl             = require('./server/controllers/users-controller');
var multiparty           = require('connect-multiparty');
var multipartyMiddleware = multiparty();

mongoose.connect('mongodb://localhost:27017/user-login');

app.use(bodyParser.json());
app.use('/client',express.static(__dirname + '/client'));
app.use('/node_modules',express.static(__dirname + '/node_modules'))
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(multipartyMiddleware)
//main page
app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html')
})

//users
app.post('/api/users/register', UserCtrl.register)
app.post('/api/users/login', UserCtrl.login)
app.post('/api/users/update', UserCtrl.update)
app.post('/api/profile/editPhoto',multipartyMiddleware,UserCtrl.profilePic)

app.listen(port,function(){
    console.log('Listening on port ' + port);
})
