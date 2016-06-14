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
        Tweet.find({$and:[{_id:req.params.id},{likeFromUser:req.params.userId}]},function(err, check){
            if(err){
                console.log(err)
            }else{

                if(check.length === 0){
                    Tweet.update({_id:req.params.id},{$push:{likeFromUser:req.params.userId}},function(err, num){
                        if(err){
                            console.log(err)
                        }else{
                            Tweet.findById(req.params.id,function(err, result){
                                result.likes +=1;
                                result.save()
                                res.json(result)
                            })
                        }
                    })
                }
            }
        })
    },
    unlike:function(req, res){
        Tweet.find({$and:[{_id:req.params.id},{likeFromUser:req.params.userId}]},function(err, check){
            if(err){
                console.log(err)
            }else{
                if(check.length === 1){
                    Tweet.update({_id:req.params.id},{$pull:{likeFromUser:req.params.userId}},function(err, num){
                        if(err){
                            console.log(err)
                        }else{
                            Tweet.findById(req.params.id,function(err, result){
                                result.likes -=1;
                                result.save()
                                res.json(result)
                            })
                        }
                    })
                }
            }
        })
    }
}

