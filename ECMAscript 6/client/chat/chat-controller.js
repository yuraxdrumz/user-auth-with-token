(()=>{
    angular.module('myApp')
    .controller('chatController',['$scope','MessageCreator','auth','$location','$state',($scope,MessageCreator,auth,$location,$state)=>{

    if(auth.isLoggedIn()){
        $scope.loggedIn = true;
        $scope.logout = ()=>{
            auth.logout();
            $location.path('/');
        }
        $scope.user = auth.currentUser();
        $scope.message = '';
        $scope.filterText = '';
        $scope.messages = [];
        let socket = io.connect();

        socket.on('receiveMessage',(data)=>{
            $scope.messages.unshift(data);
            $scope.$apply();
        })

        socket.on('pastMessages',(data)=>{
            $scope.messages = data.reverse();
            $scope.$apply();
        })
        $scope.sendMessage = ()=>{
            if (!$scope.message == '') {
                let chatMessage = {
                    username:$scope.user.name,
                    message:$scope.message
                }

                MessageCreator.postMessage(chatMessage,(result,err)=>{
                if(err){
                    window.alert('error saving to db');
                    return
                }
                $scope.message = '';
                })
            }
        }
    }else
       $state.go('main')
    }])
})()
