(function(){
    angular.module('myApp')
    .factory('tweet',['$http',function($http){
        return {
            postTweet:function(request){
                return $http.post('/api/tweet/post',request).then(function(res){
                    return res.data
                },function(err){
                    throw err.status + err.data
                })
            },
            getAllTweets:function(){
                return $http.get('/api/tweet/all-tweets').then(function(res){
                    return res.data
                },function(err){
                    throw err.status + err.data
                })
            }
        }

    }])
})()
