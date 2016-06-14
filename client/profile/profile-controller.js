(function(){
    angular.module('myApp')
    .controller('profileController',['$scope','$http','$location','auth','meanData','$state',function($scope,$http,$location,auth,meanData,$state){

        if(!auth.isLoggedIn()){
            $state.go('main')
        }
        $scope.user = {};
        meanData.getProfile().then(function(res){
            $scope.user = res.data
            $scope.loggedIn = true
        })
        $scope.logout = function(){
            auth.logout();
            $scope.loggedIn = false;
            $location.path('/')
        }
        $scope.changeInfo = function () {
            auth.updateUser($scope.user).then(function (res) {
                if($scope.file){
                    auth.uploadPhoto($scope.file,$scope.user._id).then(function (res) {
                        $scope.user = auth.currentUser()
                        console.log($scope.user)

                    })
                }
                $scope.user = auth.currentUser()
                console.log($scope.user)
            })
        }


    }])
})()
