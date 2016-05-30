(function(){
    angular.module('myApp')
    .controller('mainController',['$scope','$http','$location','users','tweet',function($scope,$http,$location,users,tweet){

        if(localStorage['user-data']){
            $scope.loggedIn = true
            $scope.user = JSON.parse(localStorage['user-data'])
            tweet.getAllTweets().then(function(res){
                $scope.tweets = res
            })
        }else{
            $scope.loggedIn = false;
        }

        $scope.login = function(){
            users.addUser($scope.user).then(function(res){
                localStorage.setItem('user-data',JSON.stringify(res))
                $scope.loggedIn = true;
            })
        }


        $scope.logout = function(){
            localStorage.clear();
            $scope.loggedIn = false;
            $location.path('/')

        }

        $scope.sendTweet = function(event){
            event = event || window.event;
                if(event.keyCode === 13){
                    var request = {
                        user:$scope.user.username || $scope.user.email,
                        userId: $scope.user._id,
                        userImage:$scope.user.image,
                        content: $scope.newTweet
                    }
                    tweet.postTweet(request).then(function(res){
                        $scope.tweets = res
                        $scope.newTweet = ''
                    })
                }
        }


    }])
})()
