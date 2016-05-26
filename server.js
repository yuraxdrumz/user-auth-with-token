var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var port       = process.env.PORT || 3000;
var UserCtrl   = require('./server/controllers/users-controller')

mongoose.connect('mongodb://localhost:27017/user-login');

app.use(bodyParser.json());
app.use('/client',express.static(__dirname + '/client'));

//main page
app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html')
})

//users
app.post('/api/users/register', UserCtrl.register)
app.post('/api/users/login', UserCtrl.login)

app.listen(port,function(){
    console.log('Listening on port ' + port);
})
