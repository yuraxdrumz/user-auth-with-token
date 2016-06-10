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
            auth.register($scope.user).catch(function(err){
                throw err.message
            }).then(function(){
                auth.uploadPhoto($scope.file,auth.currentUser().userId).then(function(){
                auth.logout()
                $location.path('/')
                })

            })
        }




    }])
})()
