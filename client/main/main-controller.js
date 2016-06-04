(function(){
    angular.module('myApp')
    .controller('mainController',['$scope','$http','$location','users','tweet',function($scope,$http,$location,users,tweet){

        tweet.getAllTweets().then(function(res){
            $scope.tweets = res
        })


        if(localStorage['user-data']){
            $scope.loggedIn = true
            $scope.user = JSON.parse(localStorage['user-data'])
            $scope.isLiked = function(tweet){
                for(var i=0,len=$scope.tweets[$scope.tweets.indexOf(tweet)].likeFromUser.length;i<len;i++){
                    if($scope.tweets[$scope.tweets.indexOf(tweet)].likeFromUser[i] == $scope.user._id){
                        return true
                    }else{
                        if($scope.tweets[$scope.tweets.indexOf(tweet)].likeFromUser[i] == undefined){
                            return false
                        }

                    }
                }
            }
        }else{
            $scope.loggedIn = false;
        }

        $scope.login = function(){
            users.addUser($scope.user).then(function(res){
                localStorage.setItem('user-data',JSON.stringify(res))
                $scope.loggedIn = true;
                $location.path('/profile')
            })
        }


        $scope.logout = function(){
            localStorage.clear();
            $scope.loggedIn = false;
            $scope.user = null;
            $location.path('/')

        }

        $scope.sendTweet = function(event){
            event = event || window.event;
                if(event.keyCode === 13){
                    var request = {
                        user:$scope.user.username || $scope.user.email,
                        userId: $scope.user._id,
                        userImage:$scope.user.image,
                        content: $scope.newTweet,
                        likes:0
                    }
                    tweet.postTweet(request).then(function(res){
                        $scope.tweets = res
                        $scope.newTweet = ''
                    })
                }
        }

        $scope.like = function(tweetObject,userId){
            tweet.likeTweet(tweetObject._id,userId).then(function(res){
                $scope.tweets[$scope.tweets.indexOf(tweetObject)] = res
            })
        }
        $scope.unlike = function(tweetObject,userId){
            tweet.unlikeTweet(tweetObject._id,userId).then(function(res){
                $scope.tweets[$scope.tweets.indexOf(tweetObject)] = res
            })
        }





    }])
})()
