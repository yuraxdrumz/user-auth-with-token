(function(){
    angular.module('myApp')
    .controller('mainController',['$scope','$http','$location','users',function($scope,$http,$location,users){

        if(localStorage['user-data']){
            $scope.loggedIn = true
        }else{
            $scope.loggedIn = false;
        }

        $scope.login = function(){
            users.addUser($scope.user).then(function(res){
                localStorage.setItem('user-data',JSON.stringify(res))
                $scope.loggedIn = true;
            })
        }


        $scope.logout = function(){
            localStorage.clear();
            $scope.loggedIn = false;
            $location.path('/')

        }

    }])
})()
