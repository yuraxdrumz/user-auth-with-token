(function(){
    angular.module('myApp')
    .controller('regController',['$scope','$http','$location','auth','Upload',function($scope,$http,$location,auth,Upload){

        $scope.isFormValid = false
        auth.logout();

        $scope.$watch(function(){
            if($scope.file){
                $scope.isFormValid = true
            }
        })

        $scope.register = function(){
            auth.register($scope.user).then(function(){
                $location.path('/')
            })
        }




    }])
})()
