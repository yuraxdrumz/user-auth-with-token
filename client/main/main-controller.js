(function(){
    angular.module('myApp')
    .controller('mainController',['$scope','$http','$location','auth','tweet',function($scope,$http,$location,auth,tweet){

        //if user logged in get tweets and get user info
        if(auth.isLoggedIn()){
            $scope.loggedIn = true;
            tweet.getAllTweets().then(function(res){
            $scope.tweets = res;
            $scope.user = auth.currentUser()
            })
        }
        // watch if user is logged in, if not, switch main to login screen
        $scope.$watch(auth.isLoggedIn,function(newVal,oldVal){
            if(newVal === false){
                $scope.loggedIn = false;
            }
        });
        //login function
        $scope.login = function(){
            auth.login($scope.user)
                .then(function(){
                $location.path('/profile')
            })
        };
        //logout function
        $scope.logout = function(){
            auth.logout();
            $location.path('/');
        };
        //send tweet on enter
        $scope.sendTweet = function(event){
            event = event || window.event;
                if(event.keyCode === 13){
                    var request = {
                        user:$scope.user.name || $scope.user.email,
                        userId: $scope.user._id,
                        userImage:$scope.user.image,
                        content: $scope.newTweet,
                        likes:0
                    };
                    tweet.postTweet(request).then(function(res){
                        $scope.tweets = res;
                        $scope.newTweet = '';
                    })
                }
        };
        //like functionality
        $scope.like = function(tweetObject,userId){
            tweet.likeTweet(tweetObject._id,userId).then(function(res){
                $scope.tweets[$scope.tweets.indexOf(tweetObject)] = res
            })
        };
        //unlike functionality
        $scope.unlike = function(tweetObject,userId){
            tweet.unlikeTweet(tweetObject._id,userId).then(function(res){
                $scope.tweets[$scope.tweets.indexOf(tweetObject)] = res
            })
        };
        //check to see if post is liked or not
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
    }])
})();
