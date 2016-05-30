var Tweet = require('../models/tweets');

module.exports.postTweet = function(req, res){
    var tweet = new Tweet(req.body);
    tweet.save();
    Tweet.find({}).sort({Date:-1}).exec(function(err, allTweets){
        if(err){
            res.error(err)
        }else{
            res.json(allTweets)
        }
    })
}

module.exports.getAllTweets = function(req, res){
    Tweet.find({}).sort({Date:-1}).exec(function(err, allTweets){
        if(err){
            res.error(err)
        }else{
            res.json(allTweets)
        }
    })
}
