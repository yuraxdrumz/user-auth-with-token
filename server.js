var express              = require('express');
var app                  = express();
var mongoose             = require('mongoose');
var bodyParser           = require('body-parser');
var UserCtrl             = require('./server/controllers/users-controller');
var multiparty           = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var tweetController      = require('./server/controllers/tweet-controller')
var socketio             = require('socket.io');
var path                 = require('path')
var http                 = require('http')
var Message              = require('./server/models/messages')

//db connect
mongoose.connect('mongodb://localhost:27017/user-login');



app.use(bodyParser.json());
app.use('/client',express.static(__dirname + '/client'));
app.use('/node_modules',express.static(__dirname + '/node_modules'))
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
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


//tweets
app.post('/api/tweet/post', tweetController.postTweet)
app.get('/api/tweet/all-tweets', tweetController.getAllTweets)
app.put('/api/tweets/:id/:userId/like',tweetController.like)
app.delete('/api/tweets/:id/:userId/unlike',tweetController.unlike)


//set port
app.set('port', process.env.PORT || 3000);

//chat
app.post('/message',function(req, res){
    var message = new Message({
        username:req.body.username,
        message:req.body.message
    });

    message.save(function(err, saved){
        if(err){
            res.send(400)
            return console.log('error saveing to db')
        }
        res.send(saved);
        io.sockets.emit('receiveMessage',saved);
    })
})


app.get('/message',function(req, res){
    Message.find(function(err, allMessages){
        if(err){
            return res.send(err)
        }
        res.send(allMessages)
    })
})

//create server
var server = http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'))
})

// listens to the server
var io = socketio.listen(server);

// on connection find all messages
io.sockets.on('connection',function(socket){
    console.log('client connected')
    Message.find(function(err, allMessages){
        if(err){
            return console.error(err)
        }
        socket.emit('pastMessages', allMessages)
    })
})


