(function(){
    angular.module('myApp')
    .controller('regController',['$scope','$http','$location',function($scope,$http,$location){

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
