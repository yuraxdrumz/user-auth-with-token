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
            $http.post('api/users/update',$scope.user).then(function(res){
                $scope.user = res.data;
                localStorage.setItem('user-data',JSON.stringify($scope.user))
                $location.path('/')
            })
        }
    }])
})()
