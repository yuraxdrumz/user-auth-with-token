(function(){
    angular.module('myApp')
    .controller('profileController',['$scope','$http','$location','auth','meanData','$state',function($scope,$http,$location,auth,meanData,$state){

        if(!auth.isLoggedIn()){
            $state.go('main')
        }
        $scope.user = {};
        meanData.getProfile().then(function(res){
            $scope.user = res.data
            $scope.loggedIn = true
        }).catch(function (err) {
            throw err.message
        });
        $scope.logout = function(){
            auth.logout()
            $location.path('/')

        }


    }])
})()
