(function(){
    angular.module('myApp')
    .controller('chatController',['$scope','MessageCreator','auth','$location','$state',function($scope,MessageCreator,auth,$location,$state){

    if(auth.isLoggedIn()){
        $scope.loggedIn = true;

        $scope.logout = function(){
            auth.logout();
            $location.path('/');
        };

        $scope.user = auth.currentUser();
        $scope.message = '';
        $scope.filterText = '';
        $scope.messages = [];
        var socket = io.connect();

        socket.on('receiveMessage',function(data){
            $scope.messages.unshift(data);
            $scope.$apply();
        });

        socket.on('pastMessages',function(data){
            $scope.messages = data.reverse();
            $scope.$apply();
        });
        $scope.sendMessage = function(){
            if (!$scope.message == '') {
                var chatMessage = {
                    username:$scope.user.name,
                    message:$scope.message
                };

                MessageCreator.postMessage(chatMessage,function(result,err){
                if(err){
                    window.alert('error saving to db');
                    return
                }
                $scope.message = '';

                })
            }
        }
    }else{
       $state.go('main')
    }

    }])
})();
