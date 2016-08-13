(()=>{
    angular.module('myApp')
    .directive('nav',()=>{
        //nav bar directive
        return{
            restrict:'E',
            templateUrl:'client/navbar/nav.html'
        }
    })
})();
