(function(){
    angular.module('myApp')
    .controller('profileController',['$scope','$http','$location','users',function($scope,$http,$location,users){

        $scope.user = JSON.parse(localStorage['user-data'])

        $scope.loggedIn = true

        $scope.logout = function(){
            localStorage.clear();
            $scope.loggedIn = false;
            $location.path('/')

        }
        $scope.changeInfo = function(){
            users.updateUser($scope.user).then(function(res){
                $scope.user = res;
                localStorage.setItem('user-data',JSON.stringify($scope.user))

                if($scope.file){
                    users.uploadPhoto($scope.file,$scope.user._id).then(function(res){
                        $scope.user.image = res
                        localStorage.setItem('user-data',JSON.stringify($scope.user))
                    })
                }
            })

        }


    }])
})()
