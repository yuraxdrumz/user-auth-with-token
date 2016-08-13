(()=> {
    angular.module('myApp')
    .controller('regController',['$scope','$http','$location','auth',($scope,$http,$location,auth)=>{

        //on register enter, make sure that no token exists in localStorage
        $scope.isFormValid = false;
        auth.logout();

        // watch if file exists, if it does, form is valid and user can register
        $scope.$watch(()=>{
            if($scope.file) $scope.isFormValid = true
        });

        // register function
        $scope.register = ()=>{
            auth.register($scope.user).then(()=>{
                auth.uploadPhoto($scope.file,auth.currentUser()._id).then(()=>{
                    auth.logout();
                    $location.path('/')
                })
            }).catch((err)=>{
                throw err.message
            })
        }
    }])
})();
