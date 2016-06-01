var Tweet = require('../models/tweets');

var self = module.exports = {
    getAllTweets:function(req, res){
        Tweet.find({}).sort({Date:-1}).exec(function(err, allTweets){
            if(err){
                return res.error(err)
            }else{
                return res.json(allTweets)
            }
        })
    },
    postTweet:function(req, res){
        var tweet = new Tweet(req.body);
        tweet.save();
        self.getAllTweets(req,res)
    },
    like:function(req, res){
        var tweetId = req.body.tweetId
        var userId = req.body.userId
        Tweet.find({$and:[{_id:tweetId},{likeFromUser:userId}]},function(err, result){
            if(err){
                res.error(err)
            }else{
                if(result.length === 0){
                    Tweet.findById(tweetId,function(err, found){
                        var foundUser = found;
                        foundUser.likeFromUser.push(userId);
                        foundUser.likes +=1;
                        foundUser.save();
                        self.getAllTweets(req,res)
                    })
                }else{
                    self.getAllTweets(req,res)
                }
            }
        })
    }
}

