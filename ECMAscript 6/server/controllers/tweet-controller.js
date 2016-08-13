let Tweet = require('../models/tweets');

let self = module.exports = {
    getAllTweets:(req, res)=>{
        Tweet.find({}).sort({Date:-1}).exec((err, allTweets)=>{
            if(err) return res.error(err)
            else return res.json(allTweets)
        })
    },
    postTweet:(req, res)=>{
        let tweet = new Tweet(req.body);
        tweet.save();
        self.getAllTweets(req,res)
    },
    like:(req, res)=>{
        Tweet.find({$and:[{_id:req.params.id},{likeFromUser:req.params.userId}]},(err, check)=>{
            if(err) console.log(err)
            else{
                if(check.length === 0){
                    Tweet.update({_id:req.params.id},{$push:{likeFromUser:req.params.userId}},(err, num)=>{
                        if(err) console.log(err)
                        else{
                            Tweet.findById(req.params.id,(err, result)=>{
                                result.likes +=1;
                                result.save();
                                res.json(result)
                            })
                        }
                    })
                }
            }
        })
    },
    unlike:(req, res)=>{
        Tweet.find({$and:[{_id:req.params.id},{likeFromUser:req.params.userId}]},(err, check)=>{
            if(err) console.log(err)
            else{
                if(check.length === 1){
                    Tweet.update({_id:req.params.id},{$pull:{likeFromUser:req.params.userId}},(err, num)=>{
                        if(err) console.log(err)
                        else{
                            Tweet.findById(req.params.id,(err, result)=>{
                                result.likes -=1;
                                result.save();
                                res.json(result)
                            })
                        }
                    })
                }
            }
        })
    }
};

