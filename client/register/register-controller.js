(function(){
    angular.module('myApp')
    .controller('regController',['$scope','$http','$location',function($scope,$http,$location){
        localStorage.clear()
        $scope.register = function(){

            $http.post('api/users/register',$scope.user).success(function(res){
                console.log('user created');
                $location.path('/')
            }).error(function(err){
                console.log(err)
            })
        }
    }])
})()
