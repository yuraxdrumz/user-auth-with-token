var mongoose = require('mongoose');
var Message = require('../models/messages');

module.exports = function(io,app){

//find all messages on connection
    io.sockets.on('connection',function(socket){
        Message.find(function(err, allMessages){
            if(err){
                return console.error(err)
            }
            socket.emit('pastMessages', allMessages)
        })
    });
    //chat with socket.io
app.post('/message',function(req, res){
    var message = new Message({
        username:req.body.username,
        message:req.body.message
    });
    message.save(function(err, saved){
        if(err){
            res.send(400);
            return console.log('error saving to db')
        }
        res.send(saved);
        console.log('dsdasasd')
        io.sockets.emit('receiveMessage',saved);
    })
});


app.get('/message',function(req, res){
    Message.find(function(err, allMessages){
        if(err){
            return res.send(err)
        }
        res.send(allMessages)
        console.log('saddas')
    })
});
}
