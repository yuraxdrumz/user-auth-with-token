(function(){
    angular.module('myApp')
    .controller('profileController',['$scope','$http','$location',function($scope,$http,$location){

        $scope.user = JSON.parse(localStorage['user-data'])

        $scope.loggedIn = true

        $scope.logout = function(){
            localStorage.clear();
            $scope.loggedIn = false;
            $location.path('/')

        }
        $scope.changeInfo = function(){
            $http.post('api/users/update',$scope.user).success(function(res){
                $scope.user = res;
                localStorage.setItem('user-data',JSON.stringify($scope.user))
                $location.path('/')
            }).error(function(err){
                console.log(err)
            })
        }
    }])
})()
