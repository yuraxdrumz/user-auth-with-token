(function(){
    angular.module('myApp')
    .controller('regController',['$scope','$http','$location','users','Upload',function($scope,$http,$location,users,Upload){


        localStorage.clear()

        $scope.register = function(){

            users.registerUser($scope.user).then(function(res){
                $location.path('/')
            })
        }
    }])
})()
