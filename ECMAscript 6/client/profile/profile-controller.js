(()=>{
    angular.module('myApp')
    .controller('profileController',['$scope','$http','$location','auth','meanData','$state',($scope,$http,$location,auth,meanData,$state)=>{

        //if user not authenticated, go to main
        if(!auth.isLoggedIn()) $state.go('main')

        // get user profile
        $scope.user = {}
        meanData.getProfile().then((res)=>{
            $scope.user = res.data
            $scope.loggedIn = true
        });
        //logout function
        $scope.logout = ()=>{
            auth.logout();
            $scope.loggedIn = false;
            $location.path('/')
        };
        //change info
        $scope.changeInfo = ()=> {
            auth.updateUser($scope.user).then((res)=> {
                if($scope.file){
                    auth.uploadPhoto($scope.file,$scope.user._id).then((res)=> {
                        $scope.user = auth.currentUser()
                    })
                }
                $scope.user = auth.currentUser()
            })
        }
    }])
})();
