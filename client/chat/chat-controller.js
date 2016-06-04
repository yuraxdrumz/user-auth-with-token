(function(){
    angular.module('myApp')
    .controller('chatController',['$scope','MessageCreator',function($scope,MessageCreator){
        if(localStorage['user-data']){
            $scope.user = JSON.parse(localStorage['user-data'])
        }
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
        })
        $scope.sendMessage = function(){
            if ($scope.userName == '') {
			     window.alert('Choose a username');
			     return;
		      }

		  if (!$scope.message == '') {
            var chatMessage = {
                username:$scope.user.username,
                message:$scope.message
            }

            MessageCreator.postMessage(chatMessage,function(result,err){
                if(err){
                    window.alert('error saving to db')
                    return
                }
                $scope.message = '';

            })
        }
        }
    }])
})()
