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


module.exports.like = function(req, res){
    var tweetId = req.body.tweetId
    Tweet.findById(tweetId,function(err, result){
        if(err){
            res.error(err)
        }else{
            var tweetInfo = result
            tweetInfo.likes +=1;
            tweetInfo.save();
            Tweet.find({}).sort({Date:-1}).exec(function(err, all){
                res.json(all)
            })
        }
    })
}
