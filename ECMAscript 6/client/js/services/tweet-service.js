(()=>{
    angular.module('myApp')
    .factory('tweet',['$http',($http)=>{
        return {
            postTweet:(request)=>{
                return $http.post('/api/tweet/post',request).then((res)=>{
                    return res.data
                }).catch((err)=>{
                    throw err.status + err.data
                })
            },
            getAllTweets:()=>{
                return $http.get('/api/tweet/all-tweets').then((res)=>{
                    return res.data
                }).catch((err)=>{
                    throw err.status + err.data
                })
            },
            likeTweet:(tweetId,userId)=>{
                return $http.put('/api/tweets/' + tweetId + '/' + userId + '/like').then((res)=>{
                    return res.data
                }).catch((err)=> {
                    throw err.status + err.data
                })
            },
            unlikeTweet:(tweetId,userId)=>{
                return $http.delete('/api/tweets/' + tweetId + '/' + userId + '/unlike').then((res)=>{
                    return res.data
                }).catch((err)=> {
                    throw err.status + err.data
                })
            }
        }
    }])
})();
