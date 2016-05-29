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

        $scope.upload = function(file,userId){
            if(file){
                Upload.upload({
                    url:'/api/profile/editPhoto',
                    method:'POST',
                    data: {userId:userId},
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
            users.registerUser($scope.user).then(function(res){
                $scope.upload($scope.file,res)
            })



        }
    }])
})()
