(function(){
    angular.module('myApp')
    .controller('profileController',['$scope','$http','$location','auth','meanData',function($scope,$http,$location,auth,meanData){


        $scope.user = {};
        meanData.getProfile().then(function(res){
            $scope.user = res.data
            $scope.loggedIn = true
        }).catch(function (err) {
            throw err
        });
        $scope.logout = function(){
            auth.logout()
            $location.path('/')

        }


    }])
})()
