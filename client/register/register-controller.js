(function(){
    angular.module('myApp')
    .controller('regController',['$scope','$http','$location','users',function($scope,$http,$location,users){

        localStorage.clear()

        $scope.register = function(){

            users.registerUser($scope.user).then(function(res){
                $location.path('/')
            })
        }
    }])
})()
