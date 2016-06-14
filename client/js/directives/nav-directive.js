(function(){
    angular.module('myApp')
    .directive('nav',function(){
        //nav bar directive
        return{
            restrict:'E',
            templateUrl:'client/navbar/nav.html'
        }
    })
})();
