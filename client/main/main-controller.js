(function(){
    angular.module('myApp')
    .controller('mainController',['$scope','$http','$location','auth','tweet',function($scope,$http,$location,auth,tweet){

        if(auth.isLoggedIn()){
            $scope.loggedIn = true;
            tweet.getAllTweets().then(function(res){
            $scope.tweets = res
            $scope.user = auth.currentUser()
            })
        }
        $scope.$watch(auth.isLoggedIn,function(newVal,oldVal){
            if(newVal === false){
                $scope.loggedIn = false;
            }
        })

        $scope.login = function(){
            auth.login($scope.user)
                .catch(function(err){
                throw err.mesage
            }).then(function(){
                $location.path('/profile')
            })
        }

        $scope.logout = function(){
            auth.logout()
            $location.path('/')

        }

        $scope.sendTweet = function(event){
            event = event || window.event;
                if(event.keyCode === 13){
                    var request = {
                        user:$scope.user.name || $scope.user.email,
                        userId: $scope.user.userId,
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

        $scope.isLiked = function(tweet){
            for(var i=0,len=$scope.tweets[$scope.tweets.indexOf(tweet)].likeFromUser.length;i<len;i++){
                if($scope.tweets[$scope.tweets.indexOf(tweet)].likeFromUser[i] == $scope.user.userId){
                    return true
                }else{
                    if($scope.tweets[$scope.tweets.indexOf(tweet)].likeFromUser[i] == undefined){
                        return false
                    }

                }
            }
        }



    }])
})()
