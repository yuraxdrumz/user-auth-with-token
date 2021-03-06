(function(){
    angular.module('myApp')
    .factory('tweet',['$http',function($http){
        return {
            postTweet:function(request){
                return $http.post('/api/tweet/post',request).then(function(res){
                    return res.data
                }).catch(function(err){
                    throw err.status + err.data
                })
            },
            getAllTweets:function(){
                return $http.get('/api/tweet/all-tweets').then(function(res){
                    return res.data
                }).catch(function(err){
                    throw err.status + err.data
                })
            },
            likeTweet:function(tweetId,userId){
                return $http.put('/api/tweets/' + tweetId + '/' + userId + '/like').then(function(res){
                    return res.data
                }).catch(function (err) {
                    throw err.status + err.data
                })
            },
            unlikeTweet:function(tweetId,userId){
                return $http.delete('/api/tweets/' + tweetId + '/' + userId + '/unlike').then(function(res){
                    return res.data
                }).catch(function (err) {
                    throw err.status + err.data
                })
            }
        }
    }])
})();
