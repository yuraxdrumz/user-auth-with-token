(function(){
    angular.module('myApp')
    .controller('regController',['$scope','$http','$location','users','Upload',function($scope,$http,$location,users,Upload){

        $scope.isFormValid = true

        $scope.$watch(function(){
            if($scope.file){
                $scope.isFormValid = false
            }
        })

        localStorage.clear()

        $scope.upload = function(file){
            if(file){
                Upload.upload({
                    url:'/api/profile/editPhoto',
                    method:'POST',
                    data: {username:$scope.user.username,
                           email:$scope.user.email
                          },
                    file: file
                }).progress(function(event){
                    console.log('Firing!')
                }).success(function(data){
                    $location.path('/')
                    console.log('Image uploaded')
                }).error(function(err){
                    console.log(err)
                })
            }
        };

        $scope.register = function(){
            users.registerUser($scope.user)
            $scope.upload($scope.file)


        }
    }])
})()
