(function(){
    angular.module('myApp')
    .controller('mainController',['$scope','$http',function($scope,$http){

        if(localStorage['user-data']){
            $scope.loggedIn = true
        }else{
            $scope.loggedIn = false;
        }


        $scope.login = function(){
            $http.post('api/users/login',$scope.user).success(function(res){
                localStorage.setItem('user-data',JSON.stringify(res));
                $scope.loggedIn = true;

            }).error(function(err){
                console.log(err)
            })
        }


    }])
})()
