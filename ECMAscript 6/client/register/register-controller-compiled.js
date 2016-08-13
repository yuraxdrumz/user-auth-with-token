'use strict';

(function () {
    angular.module('myApp').controller('regController', ['$scope', '$http', '$location', 'auth', function ($scope, $http, $location, auth) {

        //on register enter, make sure that no token exists in localStorage
        $scope.isFormValid = false;
        auth.logout();

        // watch if file exists, if it does, form is valid and user can register
        $scope.$watch(function () {
            if ($scope.file) $scope.isFormValid = true;
        });

        // register function
        $scope.register = function () {
            auth.register($scope.user).then(function () {
                auth.uploadPhoto($scope.file, auth.currentUser()._id).then(function () {
                    auth.logout();
                    $location.path('/');
                });
            }).catch(function (err) {
                throw err.message;
            });
        };
    }]);
})();

//# sourceMappingURL=register-controller-compiled.js.map