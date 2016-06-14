var express              = require('express');
var app                  = express();
var http                 = require('http')
var path                 = require('path')
var morgan               = require('morgan')
var mongoose             = require('mongoose');
var bodyParser           = require('body-parser');
var passport             = require('passport')
var jwt                  = require('express-jwt');
var multiparty           = require('connect-multiparty');
var multipartyMiddleware = multiparty();

// controllers
var tweetController      = require('./server/controllers/tweet-controller')
var UserCtrl             = require('./server/controllers/users-controller');
var Message              = require('./server/models/messages')
var ctrl                 = require('./server/controllers/profile')
                           require('./server/config/passport')
var socketio             = require('socket.io');

// authentication middleware for user
var auth = jwt({
  secret: 'lalala',
  userProperty: 'payload'
});



//db connect
mongoose.connect('mongodb://localhost:27017/user-login');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/client',express.static(__dirname + '/client'));
app.use('/node_modules',express.static(__dirname + '/node_modules'))
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(multipartyMiddleware)
app.use(passport.initialize());

app.get('/api/profile',auth,ctrl.profileRead)


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

//chat with socket.io
app.post('/message',function(req, res){
    var message = new Message({
        username:req.body.username,
        message:req.body.message
    });

    message.save(function(err, saved){
        if(err){
            res.send(400)
            return console.log('error saving to db')
        }
        res.send(saved);
        io.sockets.emit('receiveMessage',saved);
    })
})


app.get('/message',auth,function(req, res){
    console.log(req.body)
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
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

