(function(){
    angular.module('myApp')
    .controller('regController',['$scope','$http','$location','users','Upload',function($scope,$http,$location,users,Upload){

        $scope.isFormValid = true
        localStorage.clear()

        $scope.$watch(function(){
            if($scope.file){
                $scope.isFormValid = false
            }
        })

        $scope.register = function(){
            users.registerUser($scope.user).then(function(res){
                users.uploadPhoto($scope.file,res)
                $location.path('/')
            })



        }
    }])
})()
