(function(){
    angular.module('myApp')
    .controller('profileController',['$scope','$http','$location','auth','meanData',function($scope,$http,$location,auth,meanData){


        $scope.user = {};
        meanData.getProfile().then(function(res){
            $scope.user = res.data
            $scope.loggedIn = true
        }).catch(function (e) {
            console.log(e);
        });
//        $scope.loggedIn = true
        $scope.logout = function(){
            auth.logout()
            $location.path('/')

        }
//        $scope.changeInfo = function(){
//            users.updateUser($scope.user).then(function(res){
//                $scope.user = res;
//                localStorage.setItem('user-data',JSON.stringify($scope.user))
//
//                if($scope.file){
//                    users.uploadPhoto($scope.file,$scope.user._id).then(function(res){
//                        $scope.user.image = res
//                        localStorage.setItem('user-data',JSON.stringify($scope.user))
//                    })
//                }
//            })
//
//        }


    }])
})()
