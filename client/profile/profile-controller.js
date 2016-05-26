(function(){
    angular.module('myApp')
    .controller('profileController',['$scope','$http','$location',function($scope,$http,$location){
        $scope.loggedIn = true

        $scope.logout = function(){
            localStorage.clear();
            $scope.loggedIn = false;
            $location.path('/')

        }
    }])
})()
