'use strict';

(function () {
    angular.module('myApp').controller('profileController', ['$scope', '$http', '$location', 'auth', 'meanData', '$state', function ($scope, $http, $location, auth, meanData, $state) {

        //if user not authenticated, go to main
        if (!auth.isLoggedIn()) $state.go('main');

        // get user profile
        $scope.user = {};
        meanData.getProfile().then(function (res) {
            $scope.user = res.data;
            $scope.loggedIn = true;
        });
        //logout function
        $scope.logout = function () {
            auth.logout();
            $scope.loggedIn = false;
            $location.path('/');
        };
        //change info
        $scope.changeInfo = function () {
            auth.updateUser($scope.user).then(function (res) {
                if ($scope.file) {
                    auth.uploadPhoto($scope.file, $scope.user._id).then(function (res) {
                        $scope.user = auth.currentUser();
                    });
                }
                $scope.user = auth.currentUser();
            });
        };
    }]);
})();

//# sourceMappingURL=profile-controller-compiled.js.map